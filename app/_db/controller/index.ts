import { IUser, User } from "@/app/_db/models/User";
import { connectToDB } from "@/app/_db/mongoDB";
import { ITodo, Todo } from "../models/Todo";
import { Types } from "mongoose";

export const createUser = async ({ avatar, userName, password }: IUser): Promise<IUser> => {
  await connectToDB();

  const user = (await User.create({
    avatar,
    userName,
    password,
  })) as IUser;

  return user;
};

export const findUser = async ({ userName, password }: IUser): Promise<IUser> => {
  await connectToDB();

  const user = (await User.findOne({ userName, password })) as IUser;

  return user;
};

export const createTodo = async ({ todo, userId }: ITodo): Promise<ITodo> => {
  await connectToDB();

  const createdTodo = (await Todo.create({
    userId,
    todo,
  })) as ITodo;

  return createdTodo;
};

export const getTodos = async (userId: Types.ObjectId): Promise<ITodo[]> => {
  await connectToDB();

  const createdTodo = (await Todo.find({ userId })) as ITodo[];

  return createdTodo;
};

export const updateTodo = async ({ id, done }: { id: Types.ObjectId; done: boolean }): Promise<ITodo> => {
  await connectToDB();

  const updatedTodo = (await Todo.findByIdAndUpdate(id, { done })) as ITodo;

  return updatedTodo;
};
