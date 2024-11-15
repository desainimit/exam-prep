import { ErrorHandlerMiddleware } from "@middlewares";
import "reflect-metadata";
import "@controllers";
import config from "config";
import cors from "cors";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "@inversifyConfig";
import path from "path";
import cookiesParser from "cookie-parser";
import { dbConnect } from "@db";
import { ErrorHandler } from "@utils";
import { TYPES } from "@constants";
import { WebSocketService } from "@services";

const app = express();
const webSocketService = container.get<WebSocketService>(
  TYPES.WebSocketService
);
const allowedOrigins = [config.get("CLIENT_URL"), "http://192.168.4.66:4200"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow requests with no origin (mobile apps, Postman, etc.)

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use((req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp} - ${req.method} - ${req.url} - ${req.ip}`);
  next();
});

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "../src/public/assets"))
);

const server = new InversifyExpressServer(container, app, {
  rootPath: "/api/v1",
});
server.setConfig(async (app) => {
  try {
    await dbConnect();
  } catch (error) {
    ErrorHandler(error);
  }
});

server.setErrorConfig((app) => {
  const errorHandlerMiddlewareInstance = container.get<ErrorHandlerMiddleware>(
    TYPES.ErrorHandlerMiddleware
  );

  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      errorHandlerMiddlewareInstance.handle(err, req, res, next);
    }
  );
});

const buildedServer = server.build().listen(config.get("PORT"), async () => {
  console.log(`Server running on port ${config.get("PORT")}`);
});

webSocketService.startServer(buildedServer);
