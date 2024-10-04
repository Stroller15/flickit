import { Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formateZodError, renderEmailEjs } from "../helper.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/email.job.js";

const uniqueId = uuidv4();
console.log(uniqueId);

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
    const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;

    const emailBody = await renderEmailEjs("email-verify", {
      name: payload.name,
      url,
    });

    //* send email
    await emailQueue.add(emailQueueName, {to: payload.email, subject: "Flickit Email Verification", body: emailBody})
    const userData = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });

    //* generate token

    return res.status(200).json({
      msg: "Please check you email we have sent you a verification link",
      userData,
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


export const verifyEmail = (req: Request, res: Response) => {
  try {
    const {email, token} = req.query
    if()
  } catch (error) {
    
  }
}