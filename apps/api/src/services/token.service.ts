import { signJWT } from "@/helpers/jwt";
import { Context } from "@/lib/trpc";
import { UserDocument } from "@/models/user.model";
import { User } from "@/types";
import { findUserById, findUserByRefreshToken } from "./user.service";
import { TRPCError } from "@trpc/server";

export const generateTokens = async (user: UserDocument) => {
  const userId: string = user._id.toString();

  // Generate access token
  const accessToken = signJWT({ id: userId }, "ACCESS_JWT_SECRET", {
    expiresIn: "1m",
  });

  // Generate refresh token
  const refreshToken = signJWT({ id: userId }, "REFRESH_JWT_SECRET", {
    expiresIn: "15m",
  });

  return { accessToken, refreshToken };
};

export const removeAllRefreshTokens = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    return;
  }

  user.refreshTokens = [];
  await user.save();
};

export const updateUserRefreshTokens = async (
  user: UserDocument,
  refreshTokenFromCookies: string,
  newRefreshToken: string
) => {
  let newRefreshTokenArray: string[] = [];

  newRefreshTokenArray = user.refreshTokens.filter(
    (token) => token !== refreshTokenFromCookies
  );

  newRefreshTokenArray.push(newRefreshToken);

  user.refreshTokens = newRefreshTokenArray;

  await user.save();
};

export const refreshTokenReuseDetection = async (
  decodedUser: UserDocument,
  refreshTokenFromCookies: string,
  ctx: Context
) => {
  // Find User by refresh token
  const userFoundWithRefreshToken = await findUserByRefreshToken(
    decodedUser.id,
    refreshTokenFromCookies
  );

  if (!userFoundWithRefreshToken) {
    await removeAllRefreshTokens(decodedUser.id);

    ctx.res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    return true;
  }

  return false;
};
