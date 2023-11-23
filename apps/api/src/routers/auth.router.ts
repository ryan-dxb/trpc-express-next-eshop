import {
  loginUser,
  refreshToken,
  registerUser,
} from "@/controllers/authControllers";
import { router, publicProcedure } from "@/lib/trpc";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "@/schema/auth.schema";

export const authRouter = router({
  registerUser: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUser({ input })),

  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginUser({ input, ctx })),

  refreshToken: publicProcedure
    .input(refreshTokenSchema)
    .query(({ input, ctx }) => refreshToken({ input, ctx })),
});
