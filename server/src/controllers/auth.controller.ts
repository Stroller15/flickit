import { Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formateZodError } from "../helper.js";
import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt'


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
    payload.confirm_password = undefined;

    const userData = await prisma.user.create({
      data: payload
    })

    return res.status(200).json({
      msg: "Account created successfully",
      userData
    })

  } catch (err) {
    console.log("🚀 ~ registerUser ~ err:", err)
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
