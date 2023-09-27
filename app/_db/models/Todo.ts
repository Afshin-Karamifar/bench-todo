import { Schema, Types, model, models } from "mongoose";

export interface ITodo {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId;
  todo?: string;
  done?: boolean;
}

const schema = new Schema<ITodo>(
  {
    userId: { type: Types.ObjectId, required: true },
    todo: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export const Todo = models.Todo || model<ITodo>("Todo", schema);
