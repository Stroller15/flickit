import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formateZodError, renderEmailEjs } from "../helper.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/email.job.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req: Request, res: Response) => {
  const saltRounds = 10;
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      return res.status(422).json({
        errors: {
          email: "email already taken please try other email",
        },
      });
    }

    //* Encrypt password here:
    const salt = await bcrypt.genSalt(saltRounds);
    payload.password = await bcrypt.hash(payload.password, salt);

    // * Generate strong token
    const token = await bcrypt.hash(uuidv4(), salt);
    const url = `${process.env.APP_URL}/api/auth/verify-email?email=${payload.email}&token=${token}`;

    const emailBody = await renderEmailEjs("email-verify", {
      name: payload.name,
      url,
    });

    //* send email
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Flickit Email Verification",
      body: emailBody,
    });

    // * create user in db
    const userData = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });

    //* generate token

    return res.status(200).json({
      msg: "Please check you email we have sent you a verification link",
      user: {
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (err) {
    console.log("🚀 ~ registerUser ~ err:", err);
    if (err instanceof ZodError) {
      const errors = formateZodError(err);

      return res.status(422).json({
        message: "invalid input",
        errors,
      });
    }
    return res.status(500).json({
      message: "something went wrong",
      err,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.query;

    if (email && token) {
      const user = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });

      if (user) {
        if (token === user.email_verify_token) {
          // update token so not use more than once
          await prisma.user.update({
            data: {
              email_verify_token: null,
              email_varified_at: new Date().toISOString(),
            },
            where: {
              email: email as string,
            },
          });
          // Redirect to frontend
          return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
        }
      }
    }

    return res.redirect("/verify-email-error");
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error,
    });
  }
};

export const verifyEmailError = (req: Request, res: Response) => {
  return res.render("/api/auth/email-verify-error");
};

export const loginUser = async (req: Request, res: Response) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET;
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const jwtOptions = {
    expiresIn: "7d",
  };
  try {
    const body = req.body;

    const payload = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: {
          email: "No user found with this email",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ errors: { message: "Password is invalid" } });
    }
    const JWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    // Generate jwt here
    const token = jwt.sign(JWTPayload, JWT_SECRET_KEY, jwtOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        ...JWTPayload,
        token: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.log("🚀 ~ registerUser ~ err:", err);
    if (err instanceof ZodError) {
      const errors = formateZodError(err);

      return res.status(422).json({
        message: "invalid input",
        errors,
      });
    }
    return res.status(500).json({
      message: "something went wrong",
      err,
    });
  }
};
