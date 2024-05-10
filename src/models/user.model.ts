import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  user_meta_id: mongoose.Schema.Types.ObjectId;
  email: string;
  image?: string;
  workspace?: {
    owned: [
      {
        w_id: mongoose.Schema.Types.ObjectId;
        w_name: string;
      }
    ];
    collaborated: [
      {
        w_id: mongoose.Schema.Types.ObjectId;
        w_name: string;
      }
    ];
  };
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  user_meta_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  image: {
    type: String,
  },
  workspace: {
    owned: [
      {
        w_id: mongoose.Schema.Types.ObjectId,
        w_name: String,
      },
    ],
    collaborated: [
      {
        w_id: mongoose.Schema.Types.ObjectId,
        w_name: String,
      },
    ],
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
