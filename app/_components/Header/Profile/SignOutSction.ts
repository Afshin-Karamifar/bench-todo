"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function SignOutSction() {
  cookies().delete("token");
}
