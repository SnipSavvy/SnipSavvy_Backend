import { Request, Response } from "express";
import { SHARE_CATEGORY, SHARE_WORKSPACE } from "../services/shared.service";
import logger from "../utils/logger";
import { RESPONSE_MESSAGES } from "../utils/response";
import { SHARE_TO_EMAIL } from "../utils/interface";
export async function Share_category(req: Request, res: Response) {
  logger.info(
    `REQ : sharing category/workspace with such details => ${req.body}`
  );

  try {
    const data = await SHARE_CATEGORY(req.body);

    if (data === RESPONSE_MESSAGES.WHOLE_WORKSPACE_ALREADY_SHARED) {
      logger.info(`RES : The whole workspace has already been shared`);
      return res
        .status(400)
        .json({ message: RESPONSE_MESSAGES.WHOLE_WORKSPACE_ALREADY_SHARED });
    }
    if (data === RESPONSE_MESSAGES.CATEGORY_ALREADY_SHARED) {
      logger.info(`RES : Category already shared`);
      return res
        .status(400)
        .json({ message: RESPONSE_MESSAGES.CATEGORY_ALREADY_SHARED });
    }

    logger.info(`RES : share to email ${req.body.email} successfully`);
    return res
      .status(201)
      .json({ message: RESPONSE_MESSAGES.SHARING_SUCCESSFUL, data: data });
  } catch (error) {
    logger.error(`RES : an error occurred while sharing category => ${error}`);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
}


export async function Share_workspace(req: Request, res: Response){
  logger.info(`REQ : sharing workspace with such details => ${req.body}`);

  try {
    const data: SHARE_TO_EMAIL = req.body;
    
    const response = await SHARE_WORKSPACE(data);

    if (response === RESPONSE_MESSAGES.WORKSPACE_ALREADY_SHARED) {
      logger.info(`RES : The whole workspace has already been shared`);
      return res.status(400).json({ message: RESPONSE_MESSAGES.WORKSPACE_ALREADY_SHARED });
    }

    logger.info(`RES : Workspace shared successfully`);
    return res.status(201).json({ message: RESPONSE_MESSAGES.SHARING_SUCCESSFUL, data: response });
  } catch (error) {
    logger.error(`RES : An error occurred while sharing workspace => ${error}`);
    return res.status(500).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, error: error });
  }
}