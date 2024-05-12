import { Request } from "express";
import mongoose from "mongoose";

export interface CATEGORY_SCHEMA {
  id: mongoose.Types.ObjectId;
  name: string;
  description: string;
}

export interface AuthRequest extends Request {
  user_id?: string;
}

export interface WORKSPACE_SCHEMA {
  name: string;
  description: string;
  categories: CATEGORY_SCHEMA[];
  owner: mongoose.Schema.Types.ObjectId;
}

interface comment {
  user_id: mongoose.Schema.Types.ObjectId;
  text: string;
}

export interface SNIPPET_SCHEMA {
  user_id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  category_id: mongoose.Schema.Types.ObjectId;
  share_id: string;
  comments: comment[];
}

export interface SHARE_TO_EMAIL {
  email: string;
  workspace_id: mongoose.Schema.Types.ObjectId;
  category_id?: mongoose.Schema.Types.ObjectId ;
  shared_data: string;
}
