import crypto from "crypto";

export const generateApiKey = (): string => {
  const apiKeyBuffer = crypto.randomBytes(30);

  return apiKeyBuffer.toString("base64");
};

export interface TokenPayload {
  id: number;
  apiKey: string;
}

export const generateToken = (tokenPayload: TokenPayload): string => {
  const bId = BigInt(tokenPayload.id);
  const bApiKey = BigInt(`0x${Buffer.from(tokenPayload.apiKey, "base64").toString("hex")}`);

  const token = Buffer.concat([
    Buffer.from([Number(bId & 0xffn)]),
    Buffer.from(bApiKey.toString(16), "hex"),
    Buffer.from([Number((bId >> 8n) & 0xffn)]),
  ]).toString("base64");

  return token;
};

export const degenerateToken = (token: string): TokenPayload => {
  const buffer = Buffer.from(token, "base64");

  const id = buffer.readUInt8(0) + (buffer.readUInt8(2) << 8);
  const apiKey = buffer.subarray(1, 17).toString("base64");

  return { id, apiKey };
};

export const hashString = (str: string): string => {
  return crypto.pbkdf2Sync(str, "", 400000, 64, "sha512").toString("base64");
}
