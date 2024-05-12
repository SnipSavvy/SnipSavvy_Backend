// workspace.model.ts

import mongoose, { Schema, Document } from "mongoose";

export interface Category {
    _id?: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
}

export interface WorkspaceDocument extends Document {
    name: string;
    description: string;
    categories?: Category[];
    owner: mongoose.Schema.Types.ObjectId;
}

const categorySchema = new Schema<Category>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const workspaceSchema = new Schema<WorkspaceDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [categorySchema],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true }
});

export const Workspace = mongoose.model<WorkspaceDocument>("Workspace", workspaceSchema);
