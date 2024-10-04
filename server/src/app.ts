import express, { Application, Request, Response, urlencoded } from "express";

import ejs from "ejs";
import { sendEmail } from "./config/mail.js";
import cors from "cors";

const app: Application = express();

// * Default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// * View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// * Custom middleware

// * Routes
import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);

// *vQueue

import { emailQueue, emailQueueName } from "./jobs/index.js";
import path from "path";

app.get("/", async (req: Request, res: Response) => {
  try {
    const html = await ejs.renderFile(__dirname + `/views/email/welcome.ejs`, {
      name: "Shubham Verma",
    });
    await emailQueue.add(emailQueueName, {
      to: "dajovif919@abevw.com",
      subject: "testing the mail check",
      body: html,
    });
    return res.json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error("Error in route:", error);
    return res
      .status(500)
      .json({
        msg: "Error sending email",
        error: error instanceof Error ? error.message : String(error),
      });
  }
});

export default app;
