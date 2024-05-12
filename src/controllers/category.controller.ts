import { Request, Response } from "express";
import logger from "../utils/logger";
import mongoose from "mongoose";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORIES,
  FETCH_CATEGORIES_BY_WORKSPACE,
  UPDATE_CATEGORY,
} from "../services/category.service";

export async function createCategory(req: Request, res: Response) {
  try {
    logger.info(`REQ : Create a Category with the given data ${req.body}`);
    const data = await CREATE_CATEGORY(req.body);
    if (!data) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }
    logger.info(`RESP : Category created => ${data}`);
    return res.status(201).json({
      message: "Category created successfully",
      data,
    });
  } catch (error) {
    logger.error(`Error in creating a category => ${error}`);
    return res.status(500).json({
      message: "Error in creating a category",
      error,
    });
  }
}

export async function fetchCategoriesByWorkspace(req: Request, res: Response) {
  const workspace_id = new mongoose.Types.ObjectId(req.params.workspace_id);
  logger.info(
    `REQ : Fetch all categories for a particular workspace => ${workspace_id}`
  );

  try {
    const data = await FETCH_CATEGORIES_BY_WORKSPACE(workspace_id);

    if (!data) {
      return res.status(404).json({
        message: "Categories not found for the workspace",
      });
    }

    logger.info(`RESP : Categories fetched => ${data}`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(`Error fetching categories => ${error}`);
    return res.status(500).json({
      message: "Error fetching categories",
      error: error,
    });
  }
}

export async function deleteCategories(req: Request, res: Response) {
  const { workspace_id, category_id } = req.body;
  try {
    logger.info(`REQ : Delete a Category with ID ${category_id}`);
    const deleted = await DELETE_CATEGORIES(
     workspace_id,
      category_id
    );
    if (!deleted) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    logger.info("Category deleted successfully");
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    logger.error(`Error deleting category: ${error}`);
    return res.status(500).json({
      message: "Error deleting category",
      error,
    });
  }
}
export async function updateCategory(req: Request, res: Response) {
  const { workspace_id, category_id } = req.params; 

  try {
    logger.info(`REQ : Update Category ${category_id} for Workspace ${workspace_id}`);
    
    const updatedData = await UPDATE_CATEGORY(
      workspace_id,
      category_id,
      req.body 
    );

    if (!updatedData) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    logger.info(`RESP : Category updated => ${updatedData}`);
    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedData,
    });
  } catch (error) {
    logger.error(`Error updating category => ${error}`);
    return res.status(500).json({
      message: "Error updating category",
      error: error,
    });
  }
}
