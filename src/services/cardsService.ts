import { cardsRepository } from "../repositories/index.js";
import { userService } from "../services/index.js";
import { Card } from "@prisma/client";
import { CreateCard } from "../repositories/cardsRepository.js";
import {
  encryptString,
  decryptString,
} from "../utils/index.js";

async function checkUniqueTag(tag: string, userId: number) {
  const sameTagCards = await cardsRepository.findUserCardsWithTag(tag, userId);
  if (sameTagCards.length > 0) {
    throw {
      type: "conflict",
      message: "card tag already exists",
    };
  }
}

async function decryptCardFields(cards: Card[]) {
  cards.map(card => {
    card.password = decryptString(card.password);
    card.securityCode = decryptString(card.securityCode);
    }
  );
}

async function create(cardData: CreateCard) {
  await userService.userIdExists(cardData.userId);

  await checkUniqueTag(cardData.tag, cardData.userId);

  const encryptedPassword = encryptString(cardData.password);
  const encryptedCVC = encryptString(cardData.securityCode);
  cardData.password = encryptedPassword;
  cardData.securityCode = encryptedCVC;

  await cardsRepository.insert(cardData);
}

async function findUserCards(userId: number) {
  await userService.userIdExists(userId);

  const userCards = await cardsRepository.findAllUserCards(userId);

  decryptCardFields(userCards);

  return userCards;
}

async function cardIdExists(cardId: number) {
  const card = await cardsRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: "card id does not exist",
    };
  }

  return card;
}

async function findUserCardById(cardId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundCard = await cardIdExists(cardId);

  if (foundCard.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "card is not from this user",
    };
  }

  const singleCardArray = [foundCard];
  decryptCardFields(singleCardArray);

  return singleCardArray;
}

async function deleteUserCardById(cardId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundCard = await cardIdExists(cardId);

  if (foundCard.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "card is not from this user",
    };
  }

  await cardsRepository.deleteById(cardId);  
}


const cardsService = {
  create,
  findUserCards,
  findUserCardById,
  deleteUserCardById,
};

export default cardsService;