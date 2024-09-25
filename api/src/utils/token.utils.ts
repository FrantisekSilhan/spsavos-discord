/*
 * Copyright (C) 2024  František Šilhán <frantisek@slhn.cz>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import crypto from "crypto";
const API_KEY_LENGTH = 16;
const SALT_LENGTH = 10;
const ID_LENGTH = 2;

export const generateRandomString = (length: number): string => {
  const apiKeyBuffer = crypto.randomBytes(length);

  return apiKeyBuffer.toString("base64");
};

export const generateApiKey = (): string => {
  const apiKey = generateRandomString(API_KEY_LENGTH);

  return apiKey;
};

export const generateSalt = (): string => {
  const salt = generateRandomString(SALT_LENGTH);

  return salt;
};

export interface TokenPayload {
  id: number;
  apiKey: string;
  salt: string;
}

export const generateToken = (tokenPayload: TokenPayload): string => {
  const idBuffer = Buffer.alloc(ID_LENGTH);
  idBuffer.writeUInt16BE(tokenPayload.id);

  const apiKeyBuffer = Buffer.from(tokenPayload.apiKey, "base64");
  const saltBuffer = Buffer.from(tokenPayload.salt, "base64");

  const combinedBuffer = Buffer.concat([idBuffer, apiKeyBuffer, saltBuffer]);
  
  const token = combinedBuffer.toString("base64");

  return token;
};

export const degenerateToken = (token: string): TokenPayload => {
  const combinedBuffer = Buffer.from(token, "base64");

  const id = combinedBuffer.readUInt16BE(0);
  const apiKeyBuffer = combinedBuffer.subarray(ID_LENGTH, ID_LENGTH+API_KEY_LENGTH);
  const saltBuffer = combinedBuffer.subarray(ID_LENGTH+API_KEY_LENGTH, ID_LENGTH+API_KEY_LENGTH+SALT_LENGTH);

  const apiKey = apiKeyBuffer.toString("base64");
  const salt = saltBuffer.toString("base64");

  return { id, apiKey, salt };
};

export const hashApiKey = (apiKey: string, salt: string): string => {
  const hash = crypto.pbkdf2Sync(Buffer.from(apiKey, "base64"), Buffer.from(salt, "base64"), 1000, 64, "sha512");

  return hash.toString("base64");
};

export const verifyToken = (tokenPayload: TokenPayload, hashedApiKey: string): boolean => {
  const hash = hashApiKey(tokenPayload.apiKey, tokenPayload.salt);

  return hash === hashedApiKey;
};

export default {
  generateRandomString,
  generateApiKey,
  generateSalt,
  generateToken,
  degenerateToken,
  hashApiKey,
  verifyToken,
}

/* Example usage
Generation:
import tokenUtils from "./utils/token.utils";

const apiKey = tokenUtils.generateApiKey();
const salt = tokenUtils.generateSalt();

const hashedApiKey = tokenUtils.hashApiKey(apiKey, salt);

// const ID = Database insert HASHED_API_KEY returning PK ID

const tokenPayload = { id: ID, apiKey, salt };
const token = tokenUtils.generateToken(tokenPayload);

Verification:
import tokenUtils from "./utils/token.utils";

const tokenPayload = tokenUtils.degenerateToken(token);

// const HASHED_API_KEY = Database select HASHED_API_KEY where ID = tokenPayload.id

const isValid = tokenUtils.verifyToken(tokenPayload, <HASHED_API_KEY>);
*/