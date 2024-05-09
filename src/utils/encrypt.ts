import { encryption_key } from "../config/encrypt";
import logger from "./logger";
const CryptoJS = require("crypto-js");

export function encrypt(id: string) {
  try {
    logger.info("encrypting the mongodb id ......");
    logger.info("Encryption key:", encryption_key);

    const encrypt = "1234@4321";

    const encryptedObjectId = CryptoJS.AES.encrypt(id, encrypt).toString();
    return encryptedObjectId;
  } catch (error) {
    logger.error(`Caught error in encrypting the mongoDB id => ${error} `);
  }
}
