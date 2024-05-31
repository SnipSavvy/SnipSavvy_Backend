import { Request, Response } from "express";
import {
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  DELETE_WORKSPACE_ACCESS,
  EDIT_WORKSPACE,
  FETCH_ALL_WORKSPACES,
  FETCH_SHARED_WORKSPACES,
  GET_WORKSPACE_ACCESS,
  REMOVE_SHARED_WORKSPACES,
} from "../services/workspace.service";
import logger from "../utils/logger";
import mongoose from "mongoose";
import { AuthRequest } from "../utils/interface";

export async function createWorkspace(req: AuthRequest, res: Response) {
  try {
    logger.info(`REQ : Create a workspace for user ${req.user_id}`);
    let body = req.body;
    body.owner = req.user_id;
    const data = await CREATE_WORKSPACE(body);
    logger.info(`RESP : Workspace created => ${data}`);
    return res.status(201).json({
      message: "Workspace created successfully",
      data,
    });
  } catch (error) {
    logger.error(`Error in creating a workspace => ${error}`);
    return res.status(500).json({
      message: "Error in creating a workspace",
      error,
    });
  }
}

export async function fetchWorkspaces(req: AuthRequest, res: Response) {
  try {
    const id = req.user_id;
    let data;
    const { email } = req.query;

    if (id && typeof id == "string" && !email) {
      const objectId = new mongoose.Types.ObjectId(id);
      logger.info(
        `REQ : Fetch all workspaces for a particular user => ${objectId}`
      );
      data = await FETCH_ALL_WORKSPACES(objectId);
    } else {
      if (email && typeof email == "string") {
        // now fetch all the shared workspaces on this email
        data = await FETCH_SHARED_WORKSPACES(email);
      }
    }

    logger.info(`RESP : Workspaces fetched => ${data}`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(`Error in fetching workspaces => ${error}`);
    return res.status(500).json({
      message: "Error in fetching a workspaces",
      error,
    });
  }
}

export async function Delete_Workspace(req: AuthRequest, res: Response) {
  try {
    const w_id = req.query.w_id;
    logger.info(`REQ : Delete a workspace => ${w_id}`);
    if (!w_id) {
      logger.error("workspace id is required while deleting a workspace");
      return res.status(500).json({ mesg: "Workspace id is required" });
    }
    const user_id = req.user_id;
    let data;
    if (typeof w_id == "string" && typeof user_id == "string") {
      data = await DELETE_WORKSPACE(w_id, user_id);
    }

    logger.info("RES : workspace deleted successfully");
    return res.status(200).json({ msg: "workspace deleted" });
  } catch (error) {
    logger.error(`Error in deleting a workspace => ${error}`);
    return res.status(500).json({ msg: "error in deleting a workspace" });
  }
}

export async function get_workspace_access(req: Request, res: Response) {
  try {
    const w_id = req.params.w_id;
    logger.info(`REQ : get workspace access for w_id => ${w_id}`);
    if (!w_id) {
      logger.error("workspace id is required while fetching workspace access");
      return res.status(500).json({ mesg: "Workspace id is required" });
    }

    if (typeof w_id == "string") {
      let data = await GET_WORKSPACE_ACCESS(w_id);

      logger.info(`RES : fetched workspace access => ${data} `);
      return res.status(200).json(data);
    }

    logger.error("Invalid workspace id");
    return res.status(500).json({ msg: "Invalid workspace id" });
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function Remove_Workspace_Access(req: Request, res: Response) {
  try {
    logger.info("REQ : Requesting to Remove workspace access");
    const { workspace_id, email } = req.body;

    if (!workspace_id && !email) {
      logger.error("Workspace id and email is required");
      return res
        .status(500)
        .json({ msg: "workspace id and email is required" });
    }

    const data = await DELETE_WORKSPACE_ACCESS({ workspace_id, email });

    logger.info(`RES : workspace access removed from email => ${email}`);
    return res.status(200).json({ msg: "Workspace access removed", data });
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function editWorkspace(req: AuthRequest, res: Response) {
  try {
    const { id, name, description } = req.body;
    const owner_id = req.user_id;
    const updatedWorkspace = await EDIT_WORKSPACE(
      id,
      { name, description },
      owner_id
    );
    if (!updatedWorkspace) {
      return res.status(404).json({
        message: "Workspace Not Found",
      });
    }

    if (updatedWorkspace) {
      logger.info(`Workspace with id ${id} edited successfully`);
      return res.status(200).json({
        message: "Workspace edited successfully",
        data: updatedWorkspace,
      });
    } else {
      logger.error(`Workspace with id ${id} not found or could not be edited`);
      return res
        .status(404)
        .json({ message: "Workspace not found or could not be edited" });
    }
  } catch (error) {
    logger.error(`Error editing workspace: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function remove_shared_workspaces(req: Request, res: Response) {
  try {
    const { workspace_id, email } = req.body;
    logger.info(
      `REQ : remove shared workspace for email => ${email} & workspace_id => ${workspace_id}}`
    );
    if (workspace_id && email) {
      const data = await REMOVE_SHARED_WORKSPACES(workspace_id, email);
      logger.info("Shared workspace has been removed successfully");
      return res.status(200).json({ msg: "Shared workspace has been removed" });
    }
    logger.error("workspace id or email is not provided in the body");
    return res
      .status(500)
      .json({ msg: "Workspace id or email is not provided in body" });
  } catch (error) {
    logger.error(
      `Internal server error while removing shared workspace => ${error}`
    );
    return res.status(500).json({ msg: `Internal server error => ${error}` });
  }
}
