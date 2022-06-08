import type { GetStaticProps, NextPage } from "next";
import PostList from "../components/article/PostList";
import useHome from "../libs/hooks/useHome";
import fetch from "../libs/polyfill/fetch";
import { WPPost } from "../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../libs/wpapi/UrlBuilder";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1)
  .perPage(50);

const Home: NextPage<{ posts: WPPost[] }> = ({ posts: initialProps }) => {
  const { posts } = useHome(initialProps);

  return <PostList posts={posts} />;
};

export default Home;

export const getStaticProps: GetStaticProps<{
  posts: WPPost[];
}> = async () => {
  const url = urlBuilder.getURL();
  const posts = await fetch(url);
  return {
    props: {
      posts,
    },
  };
};
