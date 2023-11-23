import { trpc } from "@/trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { AppRouter } from "api";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },

      async headers() {
        return {
          authorization: "abcd",
        };
      },
    }),
  ],
});

export const serverHelper = createServerSideHelpers({
  client,
});
