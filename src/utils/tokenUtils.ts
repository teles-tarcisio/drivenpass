import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
//  token expires after 2h (in seconds):
const tokenConfig = { expiresIn: 15 /*60*60*2*/ };

export async function createToken(tokenData: Object) {
  console.log('tokenizar: ', tokenData);
  return jwt.sign(tokenData, secretKey, tokenConfig);
}

export async function verifyToken(token: string) {
  try {
    const verifiedData = jwt.verify(token, secretKey);
    return verifiedData;
  } catch (error) {
    console.log('jwt: ', error);
    throw {
      type: "unauthorized",
      message: "invalid or expired token",
    };
  }
}