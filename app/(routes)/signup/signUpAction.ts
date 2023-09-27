"use server";

import { userSignInDataSchema } from "./../../_lib/zodSchema";
import { createUser, findUser } from "@/app/_db/controller";
import { IUser } from "@/app/_db/models/User";
import { JWECompactDecrypt } from "@/app/_token";
import { ZodError } from "zod";

export const signUpAction = async (data: string): Promise<{ error: boolean; message: string[] | string }> => {
  let createdUser: IUser = {};
  
  try {
    const { avatar, userName, password }: IUser = JSON.parse(await JWECompactDecrypt(data));

    userSignInDataSchema.parse({ userName, password });

    const foundUser = await findUser({ userName });

    if (!foundUser) {
      createdUser = await createUser({ avatar, userName, password });
    } else {
      return {
        error: true,
        message: ["Username already exist, Please try with another one"],
      };
    }
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

  return {
    error: false,
    message: `Username ${createdUser.userName} has been created successfully`,
  };
};
