
import express, {  Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressSession from "express-session";
import "./app/config/passport"

import { router } from "./app/router";

import { globalErrorhandler } from "./app/middlewares/globalmiddlewares";
import notFound from "./app/middlewares/notFound";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(expressSession({
  secret:"your secret",
  resave:false,
  saveUninitialized:false
}))
app.use(cors());
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to server",
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use(globalErrorhandler);
app.use(notFound)

export default app;
