import express, { Router } from "express";
import {
  createCategory,
  fetchCategoriesByWorkspace,
} from "../controllers/category.controller";
const categoryRouter: Router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

categoryRouter.post("/", authMiddleware, createCategory);
categoryRouter.get(
  "/:workspace_id",
  authMiddleware,
  fetchCategoriesByWorkspace
);

module.exports = categoryRouter;
