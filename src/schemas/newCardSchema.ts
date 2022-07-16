import Joi from "joi";
import { NewCard } from "../repositories/cardsRepository.js";

const cardTypesArray = ["credit", "debit", "multiple"];

export const newCardSchema = Joi.object<NewCard>({
  tag: Joi.string().trim().required(),
  cardNumber: Joi.string().trim().required(),
  cardholderName: Joi.string().trim().required(),
  expirationDate: Joi.string().trim().required(),
  securityCode: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().trim().valid(...cardTypesArray).required(),
});