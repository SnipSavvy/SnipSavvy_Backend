import { Request, Response } from "express";
import {
  CREATE_JWT,
  CREATE_USER,
  IS_USER_PRESENT,
} from "../services/user.service";
import logger from "../utils/logger";
import { emailService } from "../services/mail.service";
import { register_user } from "../utils/mailFormats/register_user";

export async function register(req: Request, res: Response) {
  let user;
  try {
    const { email } = req.body;
    user = await IS_USER_PRESENT(email);
    if (!user) {
      user = await CREATE_USER(req.body);
      await emailService(
          email,
          "Welcome to SnipSavvy",
          { name: user.name },
          register_user
        )
          .then(() => logger.info(`Email sent successfully to ${email}`))
          .catch((error) => logger.error("Error in sending email:", error));
    }
    const token = await CREATE_JWT(user);

    logger.info(`token get in controller => ${token}`);

    return res.status(200).json({ msg: "Login Successfull", token: token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}
