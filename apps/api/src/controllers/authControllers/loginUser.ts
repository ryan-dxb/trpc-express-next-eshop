import { Context } from "@/lib/trpc";
import { LoginUserInput } from "@/schema/auth.schema";
import { generateTokens } from "@/services/token.service";
import { excludeFields, findUserByEmail } from "@/services/user.service";
import { User } from "@/types";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";

const loginUserController = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}) => {
  try {
    const refreshTokenFromCookies: string = ctx.req.cookies.refreshToken;
    const { email, password } = input;

    console.log(ctx.req.headers.authorization);

    // Check if user exists
    const userExists = await findUserByEmail(email);

    if (!userExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const passwordMatches = await userExists.comparePassword(password);

    if (!passwordMatches) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid credentials",
      });
    }

    // Generate Tokens
    const { accessToken, refreshToken } = await generateTokens(userExists);

    // Refresh Token with reuse prevention
    let newRefreshTokenArray: string[] = [];

    // Check if user has refresh token from cookies
    if (refreshTokenFromCookies) {
      // Filter out the refresh token from cookies that is equal to the refresh token from database
      newRefreshTokenArray = userExists.refreshTokens.filter(
        (token) => token !== refreshTokenFromCookies
      );

      // Push the new refresh token to the array
      newRefreshTokenArray.push(refreshToken);
    } else {
      newRefreshTokenArray = [...userExists.refreshTokens, refreshToken];
    }

    // Only allow 10 refresh tokens per user
    if (newRefreshTokenArray.length > 10) {
      newRefreshTokenArray.shift();
    }

    // Update refresh tokens
    userExists.refreshTokens = newRefreshTokenArray;

    await userExists.save();

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
      status: "success",
      message: "User logged in successfully",
      data: { user: userExists as User },
    };
  } catch (error) {
    throw error;
  }
};

export default loginUserController;
