import { wifiNetsRepository } from "../repositories/index.js";
import { userService } from "./index.js";
import { Wifi } from "@prisma/client";
import { CreateWifi } from "../repositories/wifiNetsRepository.js";
import {
  encryptString,
  decryptString,
} from "../utils/index.js";

async function decryptWifiPasswords(wifiNets: Wifi[]) {
  wifiNets.map(wifi => (
    wifi.password = decryptString(wifi.password))
  );
}

async function create(wifiNetData: CreateWifi) {
  await userService.userIdExists(wifiNetData.userId);

  const encryptedPassword = encryptString(wifiNetData.password);
  wifiNetData.password = encryptedPassword;

  await wifiNetsRepository.insert(wifiNetData);
}

async function findUserWifiNets(userId: number) {
  await userService.userIdExists(userId);

  const userWifiNets = await wifiNetsRepository.findAllUserWifiNets(userId);

  decryptWifiPasswords(userWifiNets);

  return userWifiNets;
}

async function wifiNetIdExists(wifiNetId: number) {
  const wifiNet = await wifiNetsRepository.findById(wifiNetId);
  if (!wifiNet) {
    throw {
      type: "not_found",
      message: "wifi net id does not exist",
    };
  }

  return wifiNet;
}

async function findUserWifiNetById(wifiNetId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundWifiNet = await wifiNetIdExists(wifiNetId);

  if (foundWifiNet.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "wifi net is not from this user",
    };
  }

  const singleWifiNetArray = [foundWifiNet];
  decryptWifiPasswords(singleWifiNetArray);

  return singleWifiNetArray;
}


async function deleteUserWifiNetById(wifiNetId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundWifiNet = await wifiNetIdExists(wifiNetId);

  if (foundWifiNet.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "wifi net is not from this user",
    };
  }

  await wifiNetsRepository.deleteById(wifiNetId);  
}


const wifiNetsService = {
  create,
  findUserWifiNets,
  findUserWifiNetById,
  deleteUserWifiNetById,
};

export default wifiNetsService;