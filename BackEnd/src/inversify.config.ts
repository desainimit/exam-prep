import { Container } from "inversify";
import { TYPES } from "@constants";

// Importing Services
import { AuthService, WebSocketService } from "@services";
import { AuthMiddleware, ErrorHandlerMiddleware } from "@middlewares";

// Importing Middleware

const container = new Container();

// Binding Services
container
  .bind<WebSocketService>(TYPES.WebSocketService)
  .to(WebSocketService)
  .inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

// Binding Middleware
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export { container };
