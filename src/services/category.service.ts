import { Workspace, WorkspaceDocument } from "../models/workspace.model";
import mongoose from "mongoose";
import { CATEGORY_SCHEMA } from "../utils/interface";
import logger from "../utils/logger";

export async function CREATE_CATEGORY(
  data: CATEGORY_SCHEMA,
): Promise<WorkspaceDocument | null> {
  try {
    const workspace_id = new mongoose.Types.ObjectId(data.id);
    const existingWorkspace = await Workspace.findById({_id: workspace_id});

    if (!existingWorkspace) {
      logger.error("Workspace not found");
      return null;
    }

    const newCategory = {
      name: data.name,
      description: data.description,
    };

    existingWorkspace.categories?.push(newCategory);

    const updatedWorkspace = await existingWorkspace.save();


    return updatedWorkspace;
  } catch (error) {
    logger.error("Error creating category:", error);
    throw error;
  }
}

export async function FETCH_CATEGORIES_BY_WORKSPACE(workspace_id: mongoose.Types.ObjectId): Promise<any> {
    try {
        const workspace = await Workspace.findById({_id:workspace_id});
        if (!workspace) {
            throw new Error("Workspace not found");
        }

        return workspace.categories;
    } catch (error) {
        throw error;
    }
}