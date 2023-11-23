import * as jose from "jose";
import { setCookie } from "cookies-next";

export const secret = new TextEncoder().encode("secret");

export interface Session extends jose.JWTPayload {
  user: {
    id: string;
    email: string;
  };
}

export async function createSession(session: Session) {
  console.log("createSession", session);

  const token = await new jose.SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  console.log("token", token);

  setCookie("sessionToken", token, {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });
}
