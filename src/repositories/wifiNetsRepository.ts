import { prisma } from "../database/dbConfig.js";
import { Wifi } from "@prisma/client";

export type CreateWifi = Omit<Wifi, "id">;
export type NewWifi = Omit<Wifi, "id" | "userId">;

async function findUserWifiNetsWithTag(wifiTag: string, userId: number) {
  return await prisma.wifi.findMany({
    where: {
      userId: userId,
      tag: wifiTag,
    },
  });
}

async function insert(wifiData: CreateWifi) {
  await prisma.wifi.create({
    data: wifiData,
  });
}

async function findAllUserWifiNets(userId: number) {
  return await prisma.wifi.findMany({
    where: {
      userId: userId,
    },
  });
}

async function findById(wifiId: number) {
  return await prisma.wifi.findFirst({
    where: {
      id: wifiId,
    },
  });
}

async function deleteById(wifiId: number) {
  return await prisma.wifi.delete({
    where: {
      id: wifiId,
    },
  });  
}

const wifiNetsRepository = {
  insert,
  findUserWifiNetsWithTag,
  findAllUserWifiNets,
  findById,
  deleteById,
};

export default wifiNetsRepository;