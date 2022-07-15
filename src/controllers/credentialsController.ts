import { Request, Response } from "express";
import { credentialsService } from "../services/index.js";
import { NewCredential, CreateCredential } from "../repositories/credentialsRepository.js";

export async function create(req: Request, res: Response) {
  const newCredential: NewCredential = res.locals.payload.validSchema;
  const userId = parseInt(res.locals.payload.userAuthData.id);
  
  const credentialData: CreateCredential = {
    ...newCredential,
    userId,
  };

  await credentialsService.create(credentialData);

  return res.status(201).send('credential successfully created');
}