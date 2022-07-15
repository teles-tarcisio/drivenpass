import { Request, Response } from "express";
import { userService } from "../services/index.js";
import { NewUser } from "../repositories/userRepository.js";

export async function create(req: Request, res: Response) {
  const newUser: NewUser = res.locals.user;
  await userService.create(newUser);

  return res.status(201).send('new user succesfully created');
}

export async function login(req: Request, res: Response) {
  const userData: NewUser = res.locals.user;

  const token: string = await userService.login(userData);
  
  return res.status(200).send(token);
}