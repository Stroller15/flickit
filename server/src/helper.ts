import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

// formate error
export const formateZodError = (err: ZodError) => {
  const error: Record<string, string> = {};

  err.issues.forEach((issue) => {
    const fieldName = issue.path[0];

    error[fieldName] = issue.message;
  });

  return error;
};

// sending email 
export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<any> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const html = await ejs.renderFile(
    __dirname + `/views/email/${fileName}.ejs`,
    payload
  );

  return html;
};
