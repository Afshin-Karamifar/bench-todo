import {
  CompactEncrypt,
  compactDecrypt,
  generateSecret,
  exportJWK,
  importSPKI,
  CompactSign,
  compactVerify,
  importPKCS8,
} from "jose";
import { encrypt, decrypt } from "crypto-js/aes";
import { enc } from "crypto-js";

export const encryptKey = (keyPair: string, salt: string) => encrypt(keyPair, salt);
export const decryptKey = (keyPair: string, salt: string) => JSON.parse(decrypt(keyPair, salt).toString(enc.Utf8));

export const publicKey = (_publicKey: string, salt: string, ALG: string) =>
  importSPKI(decryptKey(_publicKey, salt), ALG);
export const privateKey = (_privateKey: string, salt: string, ALG: string) =>
  importPKCS8(decryptKey(_privateKey, salt), ALG);

export const generateSalt = async () => {
  const secretKey = await generateSecret("HS512", { extractable: true });
  const { k } = await exportJWK(secretKey);
  return k;
};

export const JWECompactEncrypt = async (data: string) => {
  const jwe = await new CompactEncrypt(new TextEncoder().encode(data))
    .setProtectedHeader({
      alg: process.env.NEXT_PUBLIC_JWE_ALG as string,
      enc: process.env.NEXT_PUBLIC_JWT_ENC as string,
    })
    .encrypt(
      await publicKey(
        process.env.NEXT_PUBLIC_JWE_PUBLIC_KEY as string,
        process.env.NEXT_PUBLIC_JWE_SALT as string,
        process.env.NEXT_PUBLIC_JWE_ALG as string
      )
    );

  return jwe;
};

export const JWECompactDecrypt = async (encryptedData: string) => {
  const { plaintext } = await compactDecrypt(
    encryptedData,
    await privateKey(
      process.env.NEXT_PUBLIC_JWE_PRIVATE_KEY as string,
      process.env.NEXT_PUBLIC_JWE_SALT as string,
      process.env.NEXT_PUBLIC_JWE_ALG as string
    )
  );

  return new TextDecoder().decode(plaintext);
};

export const JWSCompactSign = async (data: string) => {
  const JWS = await new CompactSign(new TextEncoder().encode(data))
    .setProtectedHeader({ alg: process.env.NEXT_PUBLIC_JWS_ALG as string })
    .sign(
      await privateKey(
        process.env.NEXT_PUBLIC_JWS_PRIVATE_KEY as string,
        process.env.NEXT_PUBLIC_JWS_SALT as string,
        process.env.NEXT_PUBLIC_JWS_ALG as string
      )
    );

  return JWS;
};

export const JWSCompactVerify = async (data: string) => {
  const { payload } = await compactVerify(
    data,
    await publicKey(
      process.env.NEXT_PUBLIC_JWS_PUBLIC_KEY as string,
      process.env.NEXT_PUBLIC_JWS_SALT as string,
      process.env.NEXT_PUBLIC_JWS_ALG as string
    )
  );

  return new TextDecoder().decode(payload);
};

export const encryptAndSignData = async (data: string) => {
  const encryptedData = await JWECompactEncrypt(data);
  const signedEncryptedData = await JWSCompactSign(encryptedData);

  return signedEncryptedData;
};

export const VerifyAndDecryptData = async (data: string) => {
  const verifiedEncryptedData = await JWSCompactVerify(data);
  const decryptedData = await JWECompactDecrypt(verifiedEncryptedData);

  return decryptedData;
};
