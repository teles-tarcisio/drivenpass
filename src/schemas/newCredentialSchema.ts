import Joi from "joi";
import { NewCredential } from "../repositories/credentialsRepository.js";

export const newCredentialSchema = Joi.object<NewCredential>({
  url: Joi.string().trim().uri().required(),
  tag: Joi.string().trim().required(),
  credentialUsername: Joi.string().trim().required(),
  credentialPassword: Joi.string().trim().required(),
});