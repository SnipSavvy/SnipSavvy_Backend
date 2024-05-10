import express, { Router } from "express";
import {
  Share_category,
  Share_workspace,
} from "../controllers/shared.controller";
const authMiddleware = require("../middlewares/auth.middleware");

const ShareRouter: Router = express.Router();

ShareRouter.post("/category", authMiddleware, Share_category);
ShareRouter.post("/workspace", authMiddleware, Share_workspace);

module.exports = ShareRouter;
