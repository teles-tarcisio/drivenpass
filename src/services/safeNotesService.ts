import { safeNotesRepository } from "../repositories/index.js";
import { userService } from "./index.js";
//import { SafeNote } from "@prisma/client";
import { CreateSafeNote } from "../repositories/safeNotesRepository.js";


async function checkUniqueTitle(title: string, userId: number) {
  const sameTitleNotes = await safeNotesRepository.findUserNotesWithTitle(title, userId);
  if (sameTitleNotes.length > 0) {
    throw {
      type: "conflict",
      message: "safenote title already exists",
    };
  }
}

async function safeNoteIdExists(safeNoteId: number) {
  const safeNote = await safeNotesRepository.findById(safeNoteId);
  if (!safeNote) {
    throw {
      type: "not_found",
      message: "safenote id does not exist",
    };
  }

  return safeNote;
}

async function create(safeNoteData: CreateSafeNote) {
  await userService.userIdExists(safeNoteData.userId);

  await checkUniqueTitle(safeNoteData.title, safeNoteData.userId);

  await safeNotesRepository.insert(safeNoteData);
}

async function findUserSafeNotes(userId: number) {
  await userService.userIdExists(userId);

  const userSafeNotes = await safeNotesRepository.findAllUserSafeNotes(userId);

  return userSafeNotes;
}

async function findUserSafeNoteById(safeNoteId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundSafeNote = await safeNoteIdExists(safeNoteId);
  if (foundSafeNote.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "safenote is not from this user",
    };
  }
  
  return [foundSafeNote];
}

async function deleteUserSafeNoteById(safeNoteId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundSafeNote = await safeNoteIdExists(safeNoteId);

  if (foundSafeNote.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "safenote is not from this user",
    };
  }

  await safeNotesRepository.deleteById(safeNoteId);
}


const safeNotesService = {
  create,
  findUserSafeNotes,
  findUserSafeNoteById,
  deleteUserSafeNoteById,
};

export default safeNotesService;