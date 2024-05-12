import express, { Router } from "express";
import {
  createCategory,
  deleteCategories,
  fetchCategoriesByWorkspace,
  updateCategory,
} from "../controllers/category.controller";
const categoryRouter: Router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

categoryRouter.post("/", authMiddleware, createCategory);
categoryRouter.get(
  "/:workspace_id",
  authMiddleware,
  fetchCategoriesByWorkspace
);
categoryRouter.put("/:workspace_id/:category_id",authMiddleware, updateCategory)
categoryRouter.delete("/", authMiddleware, deleteCategories);
module.exports = categoryRouter;

