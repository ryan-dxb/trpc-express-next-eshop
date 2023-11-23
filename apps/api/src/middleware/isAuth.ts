import { verifyJWT } from "@/helpers/jwt";
import { findUserByEmail, findUserById } from "@/services/user.service";
import { ACCESS_JWT_SECRET } from "@/utils/variables";
import { TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const isAuthMiddleware = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  try {
    let accessToken;
    // Check if authorization header is present
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get access token from authorization header
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      // Get access token from cookie
      accessToken = req.cookies.accessToken;
    }

    const notAuthenticatedResponse = {
      req,
      res,
      user: null,
    };

    // If access token is not present, return null
    if (!accessToken) {
      return notAuthenticatedResponse;
    }

    // Verify access token
    const decoded = verifyJWT(accessToken, "ACCESS_JWT_SECRET");

    if (!decoded) {
      return notAuthenticatedResponse;
    }

    // If access token is valid, return user
    const user = await findUserById(decoded.id);

    if (!user) {
      return notAuthenticatedResponse;
    }

    return {
      req,
      res,
      user,
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};
