import bcrypt from "bcrypt";

const SALT = 10;

export default async function encryptPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}