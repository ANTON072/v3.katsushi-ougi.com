import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, id, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  // if (
  //   !process.env.WORDPRESS_PREVIEW_SECRET ||
  //   secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
  //   (!id && !slug)
  // ) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  // Fetch WordPress to check if the provided `id` or `slug` exists

  res.setPreviewData({});
  res.end("Preview mode enabled");
}
