import express, { Application, Request, Response, urlencoded } from "express";

import path from "path";
import {fileURLToPath} from "url"
import ejs from "ejs"
import { sendEmail } from "./config/mail.js";
import cors from "cors"

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app: Application = express();


// Default middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// Custom middleware


// Routes
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong Pong... 🚀🚀🚀🚀")
});


// Queue

import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/email.job.js";

app.get("/", async (req: Request, res: Response) => {
  try {
    // const html = await ejs.renderFile(__dirname + `/views/email/welcome.ejs`, {
    //   name: "Shubham Verma"
    // });
   
    // const emailInfo = await sendEmail("dajovif919@abevw.com", "Testing the smtp", html);
    // console.log('Email info:', emailInfo);
    await emailQueue.add(emailQueueName, {name: "jack", age: 24})
    return res.json({msg: "Email sent successfully"})
  } catch (error) {
    console.error('Error in route:', error);
    return res.status(500).json({msg: "Error sending email", error: error.message});
  }
});

export default app;
