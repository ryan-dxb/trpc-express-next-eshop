import { trpc } from "@/trpc";
import { client, serverHelper } from "@/trpc/proxyClient";

export const RefreshToken = async (refreshToken: string) => {
  const data = serverHelper.auth.refreshToken
    .fetch({ refreshToken }, {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return data;
};
