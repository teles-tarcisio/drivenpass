import { prisma } from "../database/dbConfig.js";
import { SafeNote } from "@prisma/client";

export type CreateSafeNote = Omit<SafeNote, "id">;
export type NewSafeNote = Omit<SafeNote, "id" | "userId">;

async function findUserNotesWithTitle(title: string, userId: number) {
  return await prisma.safeNote.findMany({
    where: {
      userId,
      title,
    },
  });  
}

async function insert(safeNoteData: CreateSafeNote) {
  await prisma.safeNote.create({
    data: safeNoteData,
  });
}

async function findById(safeNoteId: number) {
  return await prisma.safeNote.findFirst({
    where: {
      id: safeNoteId,
    },
  });
}

async function findAllUserSafeNotes(userId: number) {
  return await prisma.safeNote.findMany({
    where: {
      userId,
    },
  });
}


const safeNotesRepository = {
  insert,
  findUserNotesWithTitle,
  findById,
  findAllUserSafeNotes,
};

export default safeNotesRepository;