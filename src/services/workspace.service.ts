import { Workspace } from "../models/workspace.model";
import Snippet from "../models/snippet.model";
import mongoose from "mongoose";
import { WORKSPACE_SCHEMA } from "../utils/interface";
import { WorkspaceDocument } from "../models/workspace.model";
import logger from "../utils/logger";
import SharedDb from "../models/shared.model";

export async function CREATE_WORKSPACE(data: WORKSPACE_SCHEMA) {
  try {
    const resp: WorkspaceDocument = await Workspace.create(data);
    return resp;
  } catch (error) {
    logger.error(
      `Caught error in workspace service while creating a workspace => ${error}`
    );
    throw error;
  }
}

export async function FETCH_ALL_WORKSPACES(id: mongoose.Types.ObjectId) {
  // for a particular user
  try {
    const resp = await Workspace.find({ owner: id }).select("name description");
    return resp;
  } catch (error) {
    logger.error(
      `Caught error in workspace service while fetching workspaces => ${error}`
    );
    throw error;
  }
}

export async function DELETE_WORKSPACE(id: string, user_id: string) {
  try {
    await Workspace.deleteOne({ _id: id, owner: user_id });
    await Snippet.deleteMany({ workspace_id : id })
    return {
      message: "Workspace deleted successfully",
    };
  } catch (error) {
    logger.error(
      "Caught error in workspace service while deleting a workspace"
    );
    throw error;
  }
}

export async function GET_WORKSPACE_ACCESS(w_id: string) {
  try {
    const data = await SharedDb.find({
      workspace_id: w_id,
      shared_data: "workspace",
    }).select("workspace_id email");
    return data;
  } catch (error) {
    logger.error(
      `Caught error in workspace service while fetching the workspace access`
    );
    throw error;
  }
}

export async function DELETE_WORKSPACE_ACCESS({
  workspace_id,
  email,
}: {
  workspace_id: string;
  email: string;
}) {
  try {
    const data = await SharedDb.deleteOne({
      workspace_id,
      email,
      shared_data: "workspace",
    });
    return data;
  } catch (error) {
    logger.error(
      "Caught error in workspace service while deleting the workspace access"
    );
    throw error;
  }
}

export async function EDIT_WORKSPACE(Workspace_id: string, updatedWorkspaceData: Partial<WorkspaceDocument>, owner_id:any) {
  try {
    const existingWorkspace = await Workspace.findOne({_id :Workspace_id, owner :owner_id });

    if (!existingWorkspace) {
      logger.error(`Workspace with id ${Workspace_id} not found`);
      return null;
    }

    if (updatedWorkspaceData.name !== undefined) {
      existingWorkspace.name = updatedWorkspaceData.name;
    }

    if (updatedWorkspaceData.description !== undefined) {
      existingWorkspace.description = updatedWorkspaceData.description;
    }

    const updatedWorkspace = await existingWorkspace.save();

    logger.info(`Workspace with id ${Workspace_id} edited successfully`);
    return updatedWorkspace;
  } catch (error) {
    logger.error(`Error editing workspace: ${error}`);
    throw error;
  }
}