import express, { Application } from 'express';
import { Controller } from "./controllers/controller.interface";
import { eventTimestamp } from "./shared/functions";
import { errorHandler } from "./shared/middlewares";

export default class App {
  public app: Application;
  public port: number;

  constructor(controllers: Array<Controller>, port?: number) {
    this.app = express();
    this.port = port || 5000;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandlers();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json({ strict: true }));
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandlers(): void {
    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`${ eventTimestamp('APP') } App listening on the port ${this.port}.`);
    });
  }

  getServer() {
    return this.app;
  }
}
