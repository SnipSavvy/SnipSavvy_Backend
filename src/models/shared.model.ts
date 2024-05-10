import mongoose, { Document, Schema } from "mongoose";

export interface IShared extends Document {
  email: string;
  workspace_id?: mongoose.Schema.Types.ObjectId;
  category_id?: mongoose.Schema.Types.ObjectId;
  snippet_id?: mongoose.Schema.Types.ObjectId;
  shared_data: string;
  status?: "invited" | "accepted";
}

const SharedSchema = new Schema<IShared>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  workspace_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  snippet_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  shared_data: {
    type: String,
    enum: ["workspace", "category", "snippet"],
    required: true,
  },
  status: {
    type: String,
    enum: ["invited", "accepted"],
    default: "invited",
  },
});

const SharedDb = mongoose.model<IShared>("Shared", SharedSchema);
export default SharedDb;
