import express, { Router } from "express";
import { createCategory, fetchCategoriesByWorkspace } from "../controllers/category.controller";
const categoryRouter: Router = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/:workspace_id",fetchCategoriesByWorkspace)

module.exports = categoryRouter;
