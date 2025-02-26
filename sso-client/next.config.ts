//Next.js app returns 502 Bad gateway
//Ref: https://community.auth0.com/t/next-js-app-returns-502-bad-gateway-for-api-auth-me-after-a-successful-login/135909/2

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: "/AusirisSSO",
  output: "standalone",
};

export default nextConfig;
