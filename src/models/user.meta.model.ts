import mongoose, { Document, Schema } from "mongoose";

export interface IUserMeta extends Document {
  email: string;
  password: string;
}

const userMetaSchema = new Schema<IUserMeta>({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

const UserMeta = mongoose.model<IUserMeta>("UserMeta", userMetaSchema);
export default UserMeta;
