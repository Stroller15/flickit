import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

// default middleware
dotenv.config();



// custom middleware

const app: Application = express();

app.get("/", (req, res) => {
  res.json({
    message: "changa",
  });
});

export default app;
