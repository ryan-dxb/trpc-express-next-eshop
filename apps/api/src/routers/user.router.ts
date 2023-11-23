import { privateProcedure, router } from "@/lib/trpc";

export const userRouter = router({
  getMe: privateProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
