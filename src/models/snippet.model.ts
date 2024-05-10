import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  user_id: string;
  text: string;
}

const commentSchema = new Schema<IComment>({
  user_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const snippetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  workspace_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  share_status: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: [commentSchema], // Array of comments
    default: [],
  },
});

snippetSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
