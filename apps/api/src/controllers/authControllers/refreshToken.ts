import { verifyJWT } from "@/helpers/jwt";
import { Context } from "@/lib/trpc";
import { RefreshTokenInput } from "@/schema/auth.schema";
import {
  generateTokens,
  refreshTokenReuseDetection,
  updateUserRefreshTokens,
} from "@/services/token.service";
import { findUserById } from "@/services/user.service";
import { TRPCError } from "@trpc/server";

const refreshTokenController = async ({
  input,
  ctx,
}: {
  input: RefreshTokenInput;
  ctx: Context;
}) => {
  try {
    const refreshTokenFromCookies: string = input.refreshToken;

    const errorMessage =
      "Something went wrong. Could not refresh token. Please login again.";

    // Check if user has refresh token from cookies
    if (!refreshTokenFromCookies) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: errorMessage,
      });
    }

    // Decode the refresh token
    const decodedUser = await verifyJWT(
      refreshTokenFromCookies,
      "REFRESH_JWT_SECRET"
    );

    if (!decodedUser) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: errorMessage,
      });
    }

    // Check if user exists
    const userExists = await findUserById(decodedUser.id);

    if (!userExists) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: errorMessage,
      });
    }

    // Reuse prevention
    const refreshTokenIsReused = await refreshTokenReuseDetection(
      userExists,
      refreshTokenFromCookies,
      ctx
    );

    if (refreshTokenIsReused) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: errorMessage,
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken } = await generateTokens(userExists);

    // Update refresh tokens array
    await updateUserRefreshTokens(
      userExists,
      refreshTokenFromCookies,
      refreshToken
    );

    // Send Tokens in cookies
    ctx.res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    ctx.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: "Token Refreshed Successfully",
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export default refreshTokenController;
