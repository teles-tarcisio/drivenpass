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

const safeNotesRepository = {
  insert,
  findUserNotesWithTitle,  
};

export default safeNotesRepository;