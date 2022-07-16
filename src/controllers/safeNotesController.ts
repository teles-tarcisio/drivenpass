import { Request, Response } from "express";
import { safeNotesService } from "../services/index.js";
//import { Credential } from "@prisma/client";
import { NewSafeNote, CreateSafeNote } from "../repositories/safeNotesRepository.js";


export async function create(req: Request, res: Response) {
  const newSafeNote: NewSafeNote = res.locals.payload.validSchema;
  const userId = parseInt(res.locals.payload.userAuthData.id);

  const safeNoteData: CreateSafeNote = {
    ...newSafeNote,
    userId,
  };

  await safeNotesService.create(safeNoteData);

  return res.status(201).send('safenote successfully created');
}