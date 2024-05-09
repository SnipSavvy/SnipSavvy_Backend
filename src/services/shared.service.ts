import logger from "../utils/logger";
import { SHARE_TO_EMAIL } from "../utils/interface";
import SharedDb, { IShared } from "../models/shared.model";
import { RESPONSE_MESSAGES } from "../utils/response";

export async function SHARE_CATEGORY(data: SHARE_TO_EMAIL) {
  try {
    const existingWorkspaceShared = await SharedDb.findOne({
      email: data.email,
      workspace_id: data.workspace_id,
      shared_data: "workspace",
    });

    if (existingWorkspaceShared) {
      return RESPONSE_MESSAGES.WHOLE_WORKSPACE_ALREADY_SHARED;
    }

    const existingCategoryShared = await SharedDb.findOne({
      email: data.email,
      category_id: data.category_id,
      shared_data: "category",
    });

    if (existingCategoryShared) {
      return RESPONSE_MESSAGES.CATEGORY_ALREADY_SHARED;
    }

    const newCategoryShared: IShared = new SharedDb({
      email: data.email,
      workspace_id: data.workspace_id,
      category_id: data.category_id,
      shared_data: "category",
    });

    await newCategoryShared.save();
    return newCategoryShared;
  } catch (error) {
    logger.error("Error Sharing category:", error);
    throw error;
  }
}

export async function SHARE_WORKSPACE(data: SHARE_TO_EMAIL){
  try {
    const existingWorkspaceShared = await SharedDb.findOne({
      email: data.email,
      workspace_id: data.workspace_id,
      shared_data: "workspace",
    });

    if (existingWorkspaceShared) {
      return RESPONSE_MESSAGES.WORKSPACE_ALREADY_SHARED;
    }

    await SharedDb.deleteMany({
      email: data.email,
      workspace_id: data.workspace_id,
      shared_data: "category",
    });

    const newWorkspaceShared: IShared = new SharedDb({
      email: data.email,
      workspace_id: data.workspace_id,
      shared_data: "workspace",
    });

    await newWorkspaceShared.save();
    return newWorkspaceShared;
  } catch (error) {
    logger.error("Error Sharing workspace:", error);
    throw error;
  }
}