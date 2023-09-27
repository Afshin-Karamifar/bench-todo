import { enc } from "crypto-js";
import { decrypt } from "crypto-js/aes";
import { connection, connect } from "mongoose";

export async function connectToDB(): Promise<void> {
  if (connection.readyState === 0) {
    await connect(
      decrypt(process.env.NEXT_PUBLIC_DB as string, process.env.NEXT_PUBLIC_DB_SALT as string).toString(enc.Utf8)
      // eslint-disable-next-line no-console
    ).catch((error: any) => console.log(error));
  }
}
