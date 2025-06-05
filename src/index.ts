import express from "express";
import cors from "cors";

import dataSource from "./db/dataSource";
import employeeRouter from "./routers/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import processedTimeMiddleware from "./middleware/processedTime.middleware";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import authRouter from "./routers/auth.route";
import authenticationMiddleware from "./middleware/authentication.middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routers/department.route";
import delayMiddleware from "./middleware/delay.middleware";

const PORT = 3000;

const server = express();
const logger = LoggerService.getInstance("index()");

// Middleware
server.use(cors());
server.use(loggerMiddleware);
server.use(delayMiddleware);
server.use(processedTimeMiddleware);
server.use(express.json());

// Routes
server.use("/auth", authRouter);
server.use("/employees", authenticationMiddleware, employeeRouter);
server.use("/departments", authenticationMiddleware, departmentRouter);

server.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Error Middleware
server.use(errorHandlerMiddleware);

(async () => {
  try {
    await dataSource.initialize();
    logger.info("Connected to db");
    server.listen(PORT, () => {
      logger.info("Server listening to 3000");
    });
  } catch (error) {
    logger.error(`Failed to connect to db - ${error.message}`);
    process.exit(0);
  }
})();
