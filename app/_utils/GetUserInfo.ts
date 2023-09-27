import { cookies } from "next/headers";
import { VerifyAndDecryptData } from "../_token";
import { IUser } from "../_db/models/User";

export const GetUserInfo = async (): Promise<IUser | null> => {
  const cookieStore = cookies();
  const token = cookieStore.has("token")
    ? cookieStore.get("token")?.value !== ""
      ? cookieStore.get("token")?.value
      : null
    : null;

  const userInfo: IUser | null = token ? JSON.parse(await VerifyAndDecryptData(token)) : null;

  return userInfo;
};
