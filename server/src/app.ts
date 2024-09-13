import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";


// Default middleware
dotenv.config();



// Custom middleware
const app: Application = express();

// Routes

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong Pong... 🚀🚀🚀🚀")
});

export default app;
