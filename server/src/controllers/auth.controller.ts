import { Request, Response } from "express";
import {registerSchema} from "../validation/auth.validation.js"
import { ZodError } from "zod";
import { formateZodError } from "../helper.js";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
    const payload = registerSchema.parse(body);
     
  } catch (err) {
    if(err instanceof ZodError) {
      const errors = formateZodError(err);

      res.status(422).json({
        message: "invalid input",
        errors
      })
    }
    res.status(500).json({
      message: "something went wrong",
      err
    })
}
}
