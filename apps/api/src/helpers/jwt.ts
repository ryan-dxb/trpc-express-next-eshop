import jwt, { SignOptions } from "jsonwebtoken";

export type DecodedToken = {
  id: string;
  iat: number;
  exp: number;
};

export const signJWT = (
  payload: Object,
  key: "ACCESS_JWT_SECRET" | "REFRESH_JWT_SECRET",
  options: SignOptions = {}
) => {
  const privateKey = process.env[key]! as string;

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJWT = (
  token: string,
  key: "ACCESS_JWT_SECRET" | "REFRESH_JWT_SECRET"
): DecodedToken | null => {
  try {
    const publicKey = process.env[key]! as string;

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["HS256"],
    });

    return decoded as DecodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
