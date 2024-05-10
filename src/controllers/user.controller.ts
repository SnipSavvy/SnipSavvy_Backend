import { Request, Response } from "express";
import {
  CREATE_JWT,
  CREATE_USER,
  IS_USER_PRESENT,
} from "../services/user.service";
import logger from "../utils/logger";

export async function register(req: Request, res: Response) {
  let user;
  try {
    const { email } = req.body;
    user = await IS_USER_PRESENT(email);
    if (!user) {
      user = await CREATE_USER(req.body);
    }

    const token = await CREATE_JWT(user);

    logger.info(`token get in controller => ${token}`);

    return res.status(200).json({ msg: "Login Successfull", token: token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}
