import { NextResponse } from "next/server";
import { publicKey, privateKey, encryptKey, generateSalt } from "@/app/_token";
import { exportPKCS8, exportSPKI, generateKeyPair } from "jose";

async function GET() {
  const JWT_ENC = "A256GCM";
  const JWS_ALG = "RS512";
  const JWE_ALG = "RSA-OAEP-512";
  const DB_CONNECTION_STRING = "mongodb+srv://afshin:lMi6DkPRVbTP2nXK@cluster0.wdn5ymc.mongodb.net/todo";
  const DB_SULT = await generateSalt();
  const JWSKEYS = await generateKeyPair("RS512");
  const JWSSalt = await generateSalt();
  const JWEKEYS = await generateKeyPair("RSA-OAEP-512");
  const JWESalt = await generateSalt();

  const keys = {
    NEXT_PUBLIC_JWT_ENC: JWT_ENC,
    NEXT_PUBLIC_DB_SALT: DB_SULT,
    NEXT_PUBLIC_DB: encryptKey(DB_CONNECTION_STRING, DB_SULT as string).toString(),
    NEXT_PUBLIC_JWS_ALG: JWS_ALG,
    NEXT_PUBLIC_JWS_SALT: JWSSalt,
    NEXT_PUBLIC_JWS_PUBLIC_KEY: encryptKey(
      JSON.stringify(await exportSPKI(JWSKEYS.publicKey)),
      JWSSalt as string
    ).toString(),
    NEXT_PUBLIC_JWS_PRIVATE_KEY: encryptKey(JSON.stringify(await exportPKCS8(JWSKEYS.privateKey)),JWSSalt as string
    ).toString(),
    NEXT_PUBLIC_JWE_ALG: JWE_ALG,
    NEXT_PUBLIC_JWE_SALT: JWESalt,
    NEXT_PUBLIC_JWE_PUBLIC_KEY: encryptKey(
      JSON.stringify(await exportSPKI(JWEKEYS.publicKey)),
      JWESalt as string
    ).toString(),
    NEXT_PUBLIC_JWE_PRIVATE_KEY: encryptKey(
      JSON.stringify(await exportPKCS8(JWEKEYS.privateKey)),
      JWESalt as string
    ).toString(),
  };
  return NextResponse.json(keys);
}

export { GET };
