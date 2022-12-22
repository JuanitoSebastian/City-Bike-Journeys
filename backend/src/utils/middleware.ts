import { NextFunction, Request, Response } from "express";

const unknownEndPoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'Unkown endpoint' });
};

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {

  switch (error.name) {
    case 'NotFoundError':
      return response.status(404).json({ error: error.message });
  }

  next(error);
  return;
};

export default {
  unknownEndPoint,
  errorHandler
};