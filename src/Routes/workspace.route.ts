import {
  Delete_Workspace,
  Remove_Workspace_Access,
  createWorkspace,
  fetchWorkspaces,
  get_workspace_access,
} from "../controllers/workspace.controller";
import express, { Router } from "express";
const workspace: Router = express.Router();

workspace.post("/", createWorkspace);
workspace.get("/", fetchWorkspaces);
workspace.delete("/", Delete_Workspace);
workspace.get("/access/:w_id", get_workspace_access);
workspace.delete("/access", Remove_Workspace_Access);

module.exports = workspace;
