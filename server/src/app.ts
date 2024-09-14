import express, { Application, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app: Application = express();


// Default middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// Custom middleware


// Routes
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong Pong... 🚀🚀🚀🚀")
});

app.get("/", (req: Request, res: Response) => {
  res.render("welcome")
});

export default app;
