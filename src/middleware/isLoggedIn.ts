import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isLoggedIn = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    // check if auth header exists
    if (request.headers.authorization) {
      // parse token from header
      const token = request.headers.authorization.split(' ')[1]; //split the header and get the token

      if (token) {
        const { SECRET = 'secret' } = process.env;

        const payload = jwt.verify(token, SECRET);
        if (payload) {
          next();
          return;
        }

        return response
          .status(400)
          .json({ error: 'Failed to validate the token' });
      }

      return response.status(400).json({ error: 'Invalid header' });
    }

    return response
      .status(400)
      .json({ error: 'Without authorization in header' });
  } catch (error) {
    response.status(500).json({ error });
  }
};
