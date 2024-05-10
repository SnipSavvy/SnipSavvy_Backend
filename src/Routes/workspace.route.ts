import {
  Delete_Workspace,
  Remove_Workspace_Access,
  createWorkspace,
  fetchWorkspaces,
  get_workspace_access,
} from "../controllers/workspace.controller";
const authMiddleware = require("../middlewares/auth.middleware");

import express, { Router } from "express";
const workspace: Router = express.Router();

workspace.post("/", authMiddleware, createWorkspace);
workspace.get("/", authMiddleware, fetchWorkspaces);
workspace.delete("/", authMiddleware, Delete_Workspace);
workspace.get("/access/:w_id", authMiddleware, get_workspace_access);
workspace.delete("/access", authMiddleware, Remove_Workspace_Access);

module.exports = workspace;
