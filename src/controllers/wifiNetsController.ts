import { Request, Response } from "express";
import { wifiNetsService } from "../services/index.js";
import { Wifi } from "@prisma/client";
import { NewWifi, CreateWifi } from "../repositories/wifiNetsRepository.js";


export async function create(req: Request, res: Response) {
  const newWifi: NewWifi = res.locals.payload.validSchema;
  const userId = parseInt(res.locals.payload.userAuthData.id);

  const wifiData: CreateWifi = {
    ...newWifi,
    userId,
  };

  await wifiNetsService.create(wifiData);

  return res.status(201).send('wifi data successfully created');
}

export async function get(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);
  let foundWifiNets: Wifi[];

  const id = req.query?.id;
  if (!id) {
    foundWifiNets = await wifiNetsService.findUserWifiNets(userId);


    return res.status(200).send(foundWifiNets);
  } else {
    const wifiId = parseInt(id as string);
    if (isNaN(wifiId)) {
      throw {
        type: "unprocessable",
        message: "wifinet id must be a valid number",
      };
    }

    foundWifiNets = await wifiNetsService.findUserWifiNetById(wifiId, userId);

    return res.status(200).send(foundWifiNets);
  }
}

export async function exclude(req: Request, res: Response) {
  const userId = parseInt(res.locals.payload.userAuthData.id);

  const id = req.params?.id;
  const wifiId = parseInt(id);
  if (!id || isNaN(wifiId)) {
    throw {
      type: "unprocessable",
      message: "wifinet id must be a valid number",
    };
  }

  await wifiNetsService.deleteUserWifiNetById(wifiId, userId);


  return res.status(200).send('succesfully deleted wifinet data');
}