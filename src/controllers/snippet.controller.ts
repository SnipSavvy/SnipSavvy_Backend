import { Request, Response } from "express";
import {
  ADD_SNIPPET,
  CHECK_ACCESS,
  DELETE_SNIPPET,
  EDIT_SNIPPET,
  FETCH_ALL_SNIPPETS,
  FETCH_A_SNIPPET,
  GLOBAL_SEARCH,
  SHARE_SNIPPET_PERSONALLY,
  UPDATE_SNIPPET_SHARE_STATUS,
} from "../services/snippet.service";
import mongoose from "mongoose";
import logger from "../utils/logger";
import crypto from "crypto";
import { encrypt } from "../utils/encrypt";
import { emailService } from "../services/mail.service";
import { send_snippet } from "../utils/mailFormats/send_snippet";
import { AuthRequest } from "../utils/interface";

export async function addSnippet(req: AuthRequest, res: Response) {
  const BODY = req.body;
  const user_id = req.user_id;
  BODY.user_id = user_id;
  let data;

  logger.info(`REQ : add a snippet in a category with data => ${BODY}`);
  try {
    data = await ADD_SNIPPET(BODY);
    logger.info("RES : a snippet has been added successfully");
    return res
      .status(201)
      .json({ message: "Snippet added successfully", data: data });
  } catch (error) {
    logger.info(`RES : an error occured in adding an snippet => ${error}`);
    return res.status(500).json({
      message: "Error while adding snippet",
      error: error,
    });
  }
}

export async function getSnippets(req: AuthRequest, res: Response) {
  let data;

  try {
    const cat_id = req.query.cat_id;
    const snippet_id = req.query.snippet_id;

    if (cat_id && typeof cat_id == "string") {
      logger.info(
        `REQ : Fetch all snippets for a particular category => ${cat_id}`
      );
      data = await FETCH_ALL_SNIPPETS(cat_id);
    } else {
      if (snippet_id && typeof snippet_id == "string") {
        data = await FETCH_A_SNIPPET(snippet_id);
      } else {
        logger.error("No id provided");
        return res.status(500).json({
          message: "BAD REQUEST - no id provided",
        });
      }
    }

    logger.info(`RESP : Snippets fetched => ${data}`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error(`Error in fetching Snippets => ${error}`);
    return res.status(500).json({
      message: "Error in fetching Snippets",
      error: error,
    });
  }
}

export async function shareSnippet(req: AuthRequest, res: Response) {
  try {
    const { share, email, snippetid, user_name } = req.body;
    const user_id = req.user_id;
    logger.info(`REQ : Share snippet => ${snippetid}`);

    const id = encodeURIComponent(encrypt(snippetid));

    logger.info(`encrypted mongoDB id => ${id}`);

    if (share && user_id) {
      //update the db, that this particular snippet is sharable
      const snippet = await UPDATE_SNIPPET_SHARE_STATUS(snippetid, user_id);
      if (snippet) {
        const url = `https://snipsavvy.vercel.app/collab?snippet=${id}&sharing=true`;
        logger.info(`snippet sharing url generated => ${url}`);
        return res.status(200).json({ url: url });
      }
    } else {
      if (!email) {
        return res.status(500).json({ msg: "BAD REQUEST" });
      }
      // write logic for sending link in a mail
      const newemail = encodeURIComponent(encrypt(email));
      const snippet = SHARE_SNIPPET_PERSONALLY(snippetid, email);
      const url = `https://snipsavvy.vercel.app/collab?snippet=${id}&email=${newemail}`;
      logger.info(`snippet personal sharing url generated => ${url}`);
      const content = {
        user_name: user_name,
        email: email,
        url: url,
      };

      //send mail

      await emailService(
        email,
        `${user_name} has sent you a snippet ⭐`,
        content,
        send_snippet
      )
        .then(() => logger.info(`Email sent successfully to ${email}`))
        .catch((error) => logger.error("Error in sending email:", error));
    }

    return res.status(200).json({ msg: "Snippet shared successfully" });
  } catch (error) {
    logger.error(`Error in sharing snippet => ${error}`);
    return res
      .status(500)
      .json({ msg: "Internal Server Error in sharing snippet" });
  }
}

export async function delete_snippet(req: AuthRequest, res: Response) {
  try {
    const s_id = req.query.s_id;
    const user_id = req.user_id;
    logger.info(`REQ : delete a snippet => ${s_id}`);
    if (!s_id) {
      logger.error("snippet id is required");
      return res
        .status(500)
        .json({ msg: "snippet id is required for deleting a snippet" });
    }
    let data;
    if (typeof s_id == "string" && user_id) {
      data = await DELETE_SNIPPET(s_id, user_id);
    }

    logger.info(`RES : snippet deleted successfully => ${data}`);
    return res.status(200).json({ msg: "snippet deleted successfully" });
  } catch (error) {
    logger.error("error in deleting a snippet");
    return res.status(500).json({ msg: "Error in deleting a snippet" });
  }
}

export async function global_search_for_snippets(
  req: AuthRequest,
  res: Response
) {
  try {
    const text_to_search = req.query.text;
    const user_id = req.user_id;
    if (typeof text_to_search == "string" && user_id) {
      const data = await GLOBAL_SEARCH(text_to_search, user_id);
      return res.status(200).json(data);
    }

    return res.status(500).json({ msg: "query is not valid" });
  } catch (error) {
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}

export async function edit_snippet(
  req: AuthRequest,
  res: Response
){
  try {
    const {id} = req.params;
    const Body = req.body;

    const user_id = req.user_id || "";

    const updatedSnippet = await EDIT_SNIPPET(id,user_id,  Body);
    // console.log("updated",updatedSnippet)
    return res.status(200).json(updatedSnippet);
  } catch (error) {
    logger.error("Error in editing snippet")
    return res.status(500).json({msg:"Error in editing snippet"})
  }
}
export async function has_snippet_access(req: AuthRequest, res: Response) {
  try {
    logger.info(`REQ : Snippet Access check request for => ${req.body.email}`);
    const { snippet_id, email } = req.params;

    const has_access = await CHECK_ACCESS(snippet_id, email);
    logger.info(`RES : Snippet Access check response => ${has_access}`);
    if (has_access) {
      return res
        .status(200)
        .json({ msg: "Has Access => TRUE", status: has_access });
    }
    return res
      .status(200)
      .json({ msg: "Has Access => FALSE", status: has_access });
  } catch (error) {
    logger.error(`Error : error found in checking snippet access => ${error}`);
    return res
      .status(500)
      .json({ msg: `error found in checking snippet access => ${error}` });
  }
}
