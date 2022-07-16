import Joi from "joi";
import { NewSafeNote } from "../repositories/safeNotesRepository";

export const newSafeNoteSchema = Joi.object<NewSafeNote>({
  title: Joi.string().trim().max(50).required(),
  annotation: Joi.string().trim().max(1000).required()
});