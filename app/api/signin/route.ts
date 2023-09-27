import { findUser } from "@/app/_db/controller";
import { IUser } from "@/app/_db/models/User";
import { userSignInDataSchema } from "@/app/_lib/zodSchema";
import { JWECompactDecrypt, encryptAndSignData } from "@/app/_token";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

async function POST(request: Request) {
  const { encryptedData } = await request.json();
  const { userName, password }: IUser = JSON.parse(await JWECompactDecrypt(encryptedData));
  let foundUser: IUser = {};

  try {
    userSignInDataSchema.parse({ userName, password });

    foundUser = await findUser({ userName, password });

    if (!foundUser) {
      return NextResponse.json(
        {
          error: true,
          message: ["That Todo account does not exist please try different account!"],
        },
        { status: 404 }
      );
    }
  } catch (err) {
    const message =
      err instanceof ZodError
        ? err?.issues.map((issue) => issue.message)
        : ["Something has gone wrong on the server, Try again later"];

    return NextResponse.json(
      {
        error: true,
        message,
      },
      { status: 404 }
    );
  }

  delete foundUser.password;

  const oneDay = 24 * 60 * 60 * 1000;
  const encryptedToken = await encryptAndSignData(JSON.stringify(foundUser));
  const response = NextResponse.json({ revalidatePath: true, data: encryptedToken }, { status: 200 });

  response.cookies.set({
    name: "token",
    value: encryptedToken,
    expires: Date.now() + oneDay,
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  return response;
}

export { POST };
