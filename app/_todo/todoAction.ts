"use server";

import { ZodError } from "zod";
import { createTodo, updateTodo } from "../_db/controller";
import { todoDataSchema } from "../_lib/zodSchema";
import { JWECompactDecrypt } from "../_token";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export const createTodoAction = async (data: string): Promise<{ error: boolean; message: string | string[] }> => {
  try {
    const { todo, userId } = JSON.parse(await JWECompactDecrypt(data));

    todoDataSchema.parse({ todo });

    await createTodo({ todo, userId: userId as Types.ObjectId });
  } catch (err) {
    const message =
      err instanceof ZodError
        ? err?.issues.map((issue) => issue.message)
        : ["Something has gone wrong on the server, Try again later"];

    return {
      error: true,
      message,
    };
  }

  revalidatePath("/");

  return {
    error: false,
    message: `New Todo has been added successfully`,
  };
};

export const updateTodoAction = async ({
  id,
  done,
}: {
  id: Types.ObjectId;
  done: boolean;
}): Promise<{ error: boolean; message: string | string[] }> => {
  try {
    await updateTodo({ id, done });
  } catch (err) {
    return {
      error: true,
      message: ["Something has gone wrong on the server, Try again later"],
    };
  }

  revalidatePath("/");

  return {
    error: false,
    message: `Todo has been updated successfully`,
  };
};
