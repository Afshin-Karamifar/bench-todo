import { Schema, Types, model, models } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  avatar?: string;
  userName?: string;
  password?: string;
}

const schema = new Schema<IUser>(
  {
    avatar: { type: String, required: true },
    userName: { type: String, required: true, index: true },
    password: { type: String, required: true, index: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export const User = models.User || model<IUser>('User', schema);
