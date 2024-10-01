import { ZodError } from "zod";

export const formateZodError = (err: ZodError) => {
    const error: Record<string, string> = {}; 

    err.issues.forEach((issue) => {

        const fieldName = issue.path[0];

        error[fieldName] = issue.message;
    });

    return error; 
};