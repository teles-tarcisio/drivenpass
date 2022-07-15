import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const myCryptrKey = process.env.CRYPTR_KEY;

export function encryptString(content: string) {
  const cryptr = new Cryptr(myCryptrKey);
  const encryptedString = cryptr.encrypt(content);

  return encryptedString;
}

export function decryptString(encryptedString: string) {
  const cryptr = new Cryptr(myCryptrKey);
  const decryptedString = cryptr.decrypt(encryptedString);

  return decryptedString;
}