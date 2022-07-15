import { userRepository } from "../repositories/index.js";
import { NewUser } from "../repositories/userRepository.js";
import {
  encryptPassword,
  decryptPassword,
  createToken,
} from "../utils/index.js";

async function create(newUser: NewUser) {
  const existingUser = await userRepository.findByEmail(newUser.email);
  if (existingUser) {
    throw {
      type: "conflict",
      message: "email already registered",
    };
  }

  const hashedPassword = await encryptPassword(newUser.password);
  newUser.password = hashedPassword;

  await userRepository.insert(newUser);
}

async function login(userData: NewUser) {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (!existingUser) {
    throw {
      type: "not_found",
      message: "user does not exist",
    };
  }

  await decryptPassword(userData.password, existingUser.password);
  delete existingUser.password;

  const newToken = await createToken(existingUser);
  return newToken;
}

const userService = {
  create,
  login,
};

export default userService;