import { userRepository } from "../repositories/index.js";
import { NewUser } from "../repositories/userRepository.js";
import { encryptPassword } from "../utils/index.js";

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

const userService = {
  create,
};

export default userService;