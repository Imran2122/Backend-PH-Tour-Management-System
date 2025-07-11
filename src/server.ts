import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";



let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://noteDB:noteDB@productdb.nwy9ysa.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=productDB"
    );
    console.log("connect db!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening on the port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

/**
 * unhandled rejection
 * uncaught rejection error
 * signal termination sigterm


 */

//1
process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection is come please sut down the server", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//2
process.on("uncaughtException", () => {
  console.log("uncaughtException Rejection is come please sut down the server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//3.
process.on("SIGTERM", () => {
  console.log("SIGTERM signal is come please sut down the server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGTInT signal is come please sut down the server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//throw new Error("I forget to HANDLE THIS LOCAL")
// Promise.reject(new Error("i forget to catch the error"))
