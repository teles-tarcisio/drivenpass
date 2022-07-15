import { prisma } from "../database/dbConfig.js";
import { Credential } from "@prisma/client";

export type CreateCredential = Omit<Credential, "id">;
export type NewCredential = Omit<Credential, "id" | "userId">;

async function findUserCredentialsWithTag(credentialTag: string, userId: number) {
  return await prisma.credential.findMany({
    where: {
      userId: userId,
      tag: credentialTag,
    },
  });
}

async function insert(credentialData: CreateCredential) {
  await prisma.credential.create({
    data: credentialData,
  });
}

async function findAllUserCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: {
      userId: userId,
    },
  });
}

async function findById(credentialId: number) {
  return await prisma.credential.findFirst({
    where: {
      id: credentialId,
    },
  });
}

const credentialsRepository = {
  insert,
  findUserCredentialsWithTag,
  findAllUserCredentials,
  findById,
};

export default credentialsRepository;