import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as express from "express";
import {AppRoutes} from "./routes";

import  { connectDb } from './mongodb';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: Function) =>{
    console.log(`${new Date}`)
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method} ${req.path}`); 
    next()
  })
    // register all application routes
AppRoutes.forEach((route) => {
        app[route.method](route.path, (req: Request, res: Response, next: Function) => {
            route.action(req, res)
                .then(() => next)
                .catch((err) => next(err));
        });
    });

    // run app
    connectDb().then(async () => {
        app.listen( 3000, () => {
            // tslint:disable-next-line:no-console
            console.log(`The server is running on 3000`);
        });
      });


