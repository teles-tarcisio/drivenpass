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

const credentialsRepository = {
  insert,
  findUserCredentialsWithTag,
};

export default credentialsRepository;