import { prisma } from "../database/dbConfig.js";
import { Card } from "@prisma/client";

export type CreateCard = Omit<Card, "id">;
export type NewCard = Omit<Card, "id" | "userId">;

async function insert(cardData: CreateCard) {
  await prisma.card.create({
    data: cardData,
  });
}

async function findAllUserCards(userId: number) {
  return await prisma.card.findMany({
    where: {
      userId,
    },
  });
}

async function findUserCardsWithTag(cardTag: string, userId: number) {
  return await prisma.card.findMany({
    where: {
      userId: userId,
      tag: cardTag,
    },
  });
}

async function findById(cardId: number) {
  return await prisma.card.findFirst({
    where: {
      id: cardId,
    },
  });
}

async function deleteById(cardId: number) {
  return await prisma.card.delete({
    where: {
      id: cardId,
    },
  });  
}

const cardsRepository = {
  insert,
  findUserCardsWithTag,
  findAllUserCards,
  findById,
  deleteById,
};

export default cardsRepository;