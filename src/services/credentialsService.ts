import {
  credentialsRepository,
  //userRepository,
} from "../repositories/index.js";
import { userService } from "../services/index.js";
import { Credential } from "@prisma/client";
import { CreateCredential } from "../repositories/credentialsRepository.js";
import {
  encryptString,
  decryptString,
} from "../utils/index.js";

async function checkUniqueTag(tag: string, userId: number) {
  const sameTagCredentials = await credentialsRepository.findUserCredentialsWithTag(tag, userId);
  if (sameTagCredentials.length > 0) {
    throw {
      type: "conflict",
      message: "credential tag already exists",
    };
  }
}

async function decryptCredentialsPasswords(credentials: Credential[]) {
  credentials.map(credential => (
    credential.credentialPassword = decryptString(credential.credentialPassword))
  );
}

async function create(credentialData: CreateCredential) {
  await userService.userIdExists(credentialData.userId);

  await checkUniqueTag(credentialData.tag, credentialData.userId);

  const encryptedPassword = encryptString(credentialData.credentialPassword);
  credentialData.credentialPassword = encryptedPassword;

  await credentialsRepository.insert(credentialData);
}

async function findUserCredentials(userId: number) {
  await userService.userIdExists(userId);

  const userCredentials = await credentialsRepository.findAllUserCredentials(userId);

  decryptCredentialsPasswords(userCredentials);

  return userCredentials;
}

async function credentialIdExists(credentialId: number) {
  const credential = await credentialsRepository.findById(credentialId);
  if (!credential) {
    throw {
      type: "not_found",
      message: "credential id does not exist",
    };
  }

  return credential;
}

async function findUserCredentialById(credentialId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundCredential = await credentialIdExists(credentialId);

  if (foundCredential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "credential is not from this user",
    };
  }

  const singleCredentialArray = [foundCredential];
  decryptCredentialsPasswords(singleCredentialArray);

  return singleCredentialArray;
}


async function deleteUserCredentialById(credentialId: number, userId: number) {
  await userService.userIdExists(userId);

  const foundCredential = await credentialIdExists(credentialId);

  if (foundCredential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "credential is not from this user",
    };
  }

  await credentialsRepository.deleteById(credentialId);  
}


const credentialsService = {
  create,
  findUserCredentials,
  findUserCredentialById,
  deleteUserCredentialById,
};

export default credentialsService;