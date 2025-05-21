import express from "express";

import dataSource from "./db/dataSource";
import employeeRouter from "./routers/employee.route";
import loggerMiddleware from "./middleware/loggerMiddleware";
import processedTimeMiddleware from "./middleware/processedTimeMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const PORT = 3000;

const server = express();

// Middleware
server.use(loggerMiddleware);
server.use(processedTimeMiddleware);
server.use(express.json());

// Routes
server.use("/employees", employeeRouter);

server.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Error Middleware
server.use(errorHandlerMiddleware);

(async () => {
  try {
    await dataSource.initialize();
    console.log("Connected to db");
  } catch {
    console.error("Failed to connect");
    process.exit(0);
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();
