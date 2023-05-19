import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { mongodbConection } from './connection/conn';
import dotenv from 'dotenv';
import { CompanyController } from './companies/companies.controller';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import { isLoggedIn } from './middleware/isLoggedIn';

async function bootstrap() {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));

  mongodbConection();

  const companyController = new CompanyController();
  app.route('/company/signup').post(companyController.signUp);
  app.route('/company/login').post(companyController.login);
  app.route('/company/findEmail').get(companyController.findEmail);

  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      isLoggedIn,
      (req: Request, res: Response, next: NextFunction) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next,
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined,
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      },
    );
  });

  app.listen(3000);
}
bootstrap();
