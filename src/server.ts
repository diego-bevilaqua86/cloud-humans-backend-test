import dotenv from 'dotenv';
import App from './app';
import { ProfilesController } from "./controllers/profiles.controller";

dotenv.config();

const app = new App(
    [
      new ProfilesController()
    ],
    Number(process.env['SERVER_PORT']),
);

app.listen();
