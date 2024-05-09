import express, { Router } from "express";
import {
  Share_category,
  Share_workspace,
} from "../controllers/shared.controller";
const ShareRouter: Router = express.Router();

ShareRouter.post("/category", Share_category);
ShareRouter.post("/workspace", Share_workspace);

module.exports = ShareRouter;
