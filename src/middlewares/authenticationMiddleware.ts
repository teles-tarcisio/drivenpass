import { NextFunction, Request, Response } from "express";

export default function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers?.authorization;
  console.log(userToken);
  
  //1 - verify jwt
  //2 - userData em res.locals
  
  //3 - continue
  next();
}