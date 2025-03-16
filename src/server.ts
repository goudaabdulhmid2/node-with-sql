import dotenv from "dotenv";
dotenv.config();

import config from "./config/config";
import "./app";

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Close server & exit process
  config.stopApp().finally(() => {
    process.exit(1);
  });
});

// Start the server
config.runApp();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Close server & exit process
  config.stopApp().finally(() => {
    process.exit(1);
  });
});
