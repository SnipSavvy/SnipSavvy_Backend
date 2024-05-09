import { Request, Response } from "express";
import {
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  DELETE_WORKSPACE_ACCESS,
  FETCH_ALL_WORKSPACES,
  GET_WORKSPACE_ACCESS,
} from "../services/workspace.service";
import logger from "../utils/logger";
import mongoose from "mongoose";

export async function createWorkspace(req: Request, res: Response) {
  try {
    logger.info(`REQ : Create a workspace with the given data ${req.body}`);
    const data = await CREATE_WORKSPACE(req.body);
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

export async function fetchWorkspaces(req: Request, res: Response) {
  try {
    const id = req.query.user_id; // user id
    let data;

    if (id && typeof id == "string") {
      const objectId = new mongoose.Types.ObjectId(id);
      logger.info(
        `REQ : Fetch all workspaces for a particular user => ${objectId}`
      );
      data = await FETCH_ALL_WORKSPACES(objectId);
    } else {
      logger.error("user id is required or is in the wrong format");
      return res.status(500).json({
        message: "user id is required or is in the wrong format",
      });
    }

    logger.info(`RESP : Workspaces fetched => ${data}`);
    return res.status(201).json(data);
  } catch (error) {
    logger.error(`Error in fetching workspaces => ${error}`);
    return res.status(500).json({
      message: "Error in fetching a workspaces",
      error,
    });
  }
}

export async function Delete_Workspace(req: Request, res: Response) {
  try {
    const w_id = req.query.w_id;
    logger.info(`REQ : Delete a workspace => ${w_id}`);
    if (!w_id) {
      logger.error("workspace id is required while deleting a workspace");
      return res.status(500).json({ mesg: "Workspace id is required" });
    }

    let data;
    if (typeof w_id == "string") {
      data = await DELETE_WORKSPACE(w_id);
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
