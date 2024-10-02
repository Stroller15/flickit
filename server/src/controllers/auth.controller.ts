import { Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import { ZodError } from "zod";
import { formateZodError } from "../helper.js";
import { prisma } from "../config/db.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if(user) {
      return res.status(422).json({
        errors: {
          email: "email already taken please try other email"
        }
      })
    }
  } catch (err) {
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
