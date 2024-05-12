import { Workspace, WorkspaceDocument } from "../models/workspace.model";
import mongoose from "mongoose";
import { CATEGORY_SCHEMA } from "../utils/interface";
import logger from "../utils/logger";
import Snippet from "../models/snippet.model";

export async function CREATE_CATEGORY(
  data: CATEGORY_SCHEMA
): Promise<WorkspaceDocument | null> {
  try {
    const workspace_id = new mongoose.Types.ObjectId(data.id);
    const existingWorkspace = await Workspace.findById({ _id: workspace_id });

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

export async function FETCH_CATEGORIES_BY_WORKSPACE(
  workspace_id: mongoose.Types.ObjectId
): Promise<any> {
  try {
    const workspace = await Workspace.findById({ _id: workspace_id });
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace.categories;
  } catch (error) {
    throw error;
  }
}

export async function DELETE_CATEGORIES(
  workspace_id: String,
  category_id: String
): Promise<boolean> {
  try {
    const workspace = await Workspace.findById(workspace_id);

    if (!workspace) {
      logger.error("Workspace not found");
      return false;
    }
    workspace.categories = workspace.categories?.filter(
      (category) => category._id?.toString() != category_id.toString()
    );
    await workspace.save();
    logger.info("Category deleted successfully");
    await Snippet.deleteMany({ category_id });
    logger.info("Snippets deleted successfully");

    return true;
  } catch (error) {
    logger.error("Error deleting category:", error);
    throw error;
  }
}
export async function UPDATE_CATEGORY(
  workspace_id: string,
  category_id: string,
  updatedData: {
    name: string;
  description: string;}
){
  try {
    const workspace = await Workspace.findOne({_id : workspace_id});
    if (typeof workspace === "undefined" || !workspace) {
      logger.error("Workspace not found");
      return null;
    }
    if (!workspace.categories) {
      logger.error("Categories not found in workspace");
      return null;
    }
    const matchingCategory = workspace.categories.find(
      (category:any) => category._id.toString() === category_id.toString()
    );
    
    if (matchingCategory) {
      console.log(matchingCategory);
    } else {
      console.log("Matching category not found");
    }
    

    if (!matchingCategory) {
      logger.error("Category not found");
      return null;
    }

    
    matchingCategory.name = updatedData.name;

    // Save the updated workspace
    const updatedWorkspace = await workspace.save();

    return updatedWorkspace;
  } catch (error) {
    logger.error("Error in category service while updating the category:", error);
    throw error;
  }
}