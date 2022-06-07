import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import https from "https";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const proxy = httpProxyMiddleware(req, res, {
    target: process.env.WORDPRESS_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxy": "",
    },
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  return proxy;
}
