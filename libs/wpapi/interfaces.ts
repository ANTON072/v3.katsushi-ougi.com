export type WPPostType = "posts" | "pages" | "tags";

export type WPTag = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
};
