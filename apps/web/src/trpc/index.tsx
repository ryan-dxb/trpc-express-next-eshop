import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";

export const trpc = createTRPCReact<AppRouter>();
