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

async function create(safeNoteData: CreateSafeNote) {
  await userService.userIdExists(safeNoteData.userId);

  await checkUniqueTitle(safeNoteData.title, safeNoteData.userId);

  await safeNotesRepository.insert(safeNoteData);
}

const safeNotesService = {
  create,
};

export default safeNotesService;