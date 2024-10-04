import { promises } from "dns";
import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export const formateZodError = (err: ZodError) => {
  const error: Record<string, string> = {};

  err.issues.forEach((issue) => {
    const fieldName = issue.path[0];

    error[fieldName] = issue.message;
  });

  return error;
};

export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const html = await ejs.renderFile(
    __dirname + `/views/email/${fileName}.ejs`,
    payload
  );

  return html;
};
