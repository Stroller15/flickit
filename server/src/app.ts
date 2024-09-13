import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";



// default middleware
dotenv.config();



// custom middleware
const app: Application = express();

console.log("hey hau hau");

app.get("/", (req: Request, res: Response) => {
  res.send("Hey this is working no worry")
});

export default app;
