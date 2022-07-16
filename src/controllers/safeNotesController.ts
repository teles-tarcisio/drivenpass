import { Request, Response } from "express";
import { safeNotesService } from "../services/index.js";
import { SafeNote } from "@prisma/client";
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

export async function get(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);
  let foundSafeNotes: SafeNote[];

  const id = req.query?.id;
  if (!id) {
    foundSafeNotes = await safeNotesService.findUserSafeNotes(userId);

    return res.status(200).send(foundSafeNotes);
  } else {
    const safeNoteId = parseInt(id as string);
    if (isNaN(safeNoteId)) {
      throw {
        type: "unprocessable",
        message: "safenote id must be a valid number",
      };
    }

    foundSafeNotes = await safeNotesService.findUserSafeNoteById(safeNoteId, userId);

    return res.status(200).send(foundSafeNotes);
  }  
}