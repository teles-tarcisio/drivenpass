import { Request, Response } from "express";
import { credentialsService } from "../services/index.js";
import { Credential } from "@prisma/client";
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

export async function get(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);
  let foundCredentials: Credential[];

  const id = req.query?.id;
  if (!id) {
    foundCredentials = await credentialsService.findUserCredentials(userId);

    return res.status(200).send(foundCredentials);
  }
  else {
    const credentialId = parseInt(id as string);
    if (isNaN(credentialId)) {
      throw {
        type: "unprocessable",
        message: "credential id must be a valid number",
      };
    }

    foundCredentials = await credentialsService.findUserCredentialById(credentialId, userId);

    return res.status(200).send(foundCredentials);
  }
}