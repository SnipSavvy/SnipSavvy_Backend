import mongoose from "mongoose";
import { SNIPPET_SCHEMA } from "../utils/interface";
import Snippet from "../models/snippet.model";
import logger from "../utils/logger";
import SharedDb from "../models/shared.model";

export async function ADD_SNIPPET(body: SNIPPET_SCHEMA) {
  try {
    const snippetData = await Snippet.create(body);

    return snippetData;
  } catch (error) {
    logger.error(`Caught in snippet service => ${error}`);
    throw error;
  }
}

export async function FETCH_ALL_SNIPPETS(c_id: string) {
  try {
    const snippetsData = await Snippet.find({ category_id: c_id });

    return snippetsData;
  } catch (error) {
    logger.error(
      `Caught error in snippet service while fetching snippets => ${error}`
    );
    throw error;
  }
}
export async function FETCH_A_SNIPPET(s_id: string) {
  try {
    const snippetsData = await Snippet.find({ _id: s_id });

    return snippetsData;
  } catch (error) {
    logger.error(
      `Caught error in snippet service while fetching a single snippets => ${error}`
    );
    throw error;
  }
}
export async function UPDATE_SNIPPET_SHARE_STATUS(snippet_id: string) {
  try {
    const snippetsData = await Snippet.updateOne(
      { _id: snippet_id },
      { share_status: true }
    );
    return snippetsData;
  } catch (error) {
    logger.error(
      `Caught error in snippet service while updating snippet share status => ${error}`
    );
    throw error;
  }
}
export async function SHARE_SNIPPET_PERSONALLY(
  snippet_id: string,
  email: string
) {
  try {
    const snippetsData = await SharedDb.create({
      snippet_id: snippet_id,
      email: email,
      shared_data: "snippet",
    });
    return snippetsData;
  } catch (error) {
    logger.error(
      `Caught error in snippet service while sharing snippet personally => ${error}`
    );
    throw error;
  }
}

export async function DELETE_SNIPPET(id: string) {
  try {
    await Snippet.deleteOne({ _id: id });
    return {
      message: "snippet deleted successfully",
    };
  } catch (error) {
    logger.error("Caught error in snippet service while deleting a snippet");
    throw error;
  }
}

export async function GLOBAL_SEARCH(text: string) {
  try {
    const result = await Snippet.find({
      $or: [
        { title: { $regex: text, $options: "i" } },
        { description: { $regex: text, $options: "i" } },
        { tags: { $regex: text, $options: "i" } },
      ],
    });

    return result;
  } catch (error) {
    logger.error(
      `Caught error in snippet service while doing global search => ${error}`
    );
    throw error;
  }
}
