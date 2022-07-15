import {
  credentialsRepository,
  userRepository,
} from "../repositories/index.js";
import { CreateCredential } from "../repositories/credentialsRepository.js";
import {
  encryptString,
} from "../utils/index.js";

async function create(credentialData: CreateCredential) {
  const existingUser = await userRepository.findById(credentialData.userId);
  if (!existingUser) {
    throw {
      type: "not_found",
      message: "user does not exist",
    };
  }

  const sameTagCredentials = await credentialsRepository.findUserCredentialsWithTag(credentialData.tag, credentialData.userId);
  if (sameTagCredentials.length > 0) {
    throw {
      type: "conflict",
      message: "credential tag already exists",
    };
  }
  
  // use cryptr for credentialPassword
  const encryptedPassword = encryptString(credentialData.credentialPassword);
  
  credentialData.credentialPassword = encryptedPassword;
  console.log("credential for db: ", credentialData);

  await credentialsRepository.insert(credentialData);
}

const credentialsService = {
  create,
};

export default credentialsService;