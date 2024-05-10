import { JWT_SECRET } from "../config/jwt";
import UserMeta from "../models/user.meta.model";
import User, { IUser } from "../models/user.model";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";

export async function IS_USER_PRESENT(email: string) {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    logger.error(
      "caught error in user service while checking for user presence"
    );
    throw error;
  }
}

export async function CREATE_USER(body: any) {
  try {
    const { email } = body;
    console.log("service body =>", body);
    const user = await UserMeta.create({ email });
    body.user_meta_id = user._id;
    const user_data = await User.create(body);
    return user_data;
  } catch (error) {
    logger.error("caught error in user service while creating user");
    throw error;
  }
}

export async function CREATE_JWT(user: IUser) {
  try {
    const { _id, name, email } = user;
    const payload = {
      user_id: _id,
      name: name,
      email: email,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    logger.info(`Generated token => ${token}`);
    return token;
  } catch (error) {
    logger.error("caught error in user service while generating JWT");
    throw error;
  }
}
