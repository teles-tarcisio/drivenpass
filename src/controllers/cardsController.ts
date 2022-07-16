import { Request, Response } from "express";
import { cardsService } from "../services/index.js";
import { Card } from "@prisma/client";
import { NewCard, CreateCard } from "../repositories/cardsRepository.js";


export async function create(req: Request, res: Response) {
  const newCard: NewCard = res.locals.payload.validSchema;
  const userId = parseInt(res.locals.payload.userAuthData.id);

  const cardData: CreateCard = {
    ...newCard,
    userId,
  };

  await cardsService.create(cardData);

  return res.status(201).send('card successfully created');
}

export async function get(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);
  let foundCards: Card[];

  const id = req.query?.id;
  if (!id) {
    foundCards = await cardsService.findUserCards(userId);

    return res.status(200).send(foundCards);
  } else {
    const cardId = parseInt(id as string);
    if (isNaN(cardId)) {
      throw {
        type: "unprocessable",
        message: "card id must be a valid number",
      };
    }

    foundCards = await cardsService.findUserCardById(cardId, userId);

    return res.status(200).send(foundCards);
  }
}

export async function exclude(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);

  const id = req.params?.id;
  const cardId = parseInt(id);
  if (!id || isNaN(cardId)) {
    throw {
      type: "unprocessable",
      message: "card id must be a valid number",
    };
  }

  await cardsService.deleteUserCardById(cardId, userId);


  return res.status(200).send('succesfully deleted card');
}