
import express, {  Request, Response } from "express";

import cors from "cors";

import { router } from "./app/router";

import { globalErrorhandler } from "./app/middlewares/globalmiddlewares";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());

app.use(cors());

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
