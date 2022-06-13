import type { GetStaticProps, NextPage } from "next";

import fetch from "../libs/polyfill/fetch";
import { WPPost } from "../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../libs/wpapi/UrlBuilder";
import { PostList } from "../components/article";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import { NextSeo } from "next-seo";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1)
  .perPage(50);

const Home: NextPage<{ posts: WPPost[] }> = ({ posts }) => {
  return (
    <>
      <NextSeo title={`${SITE_TITLE}`} description={SITE_DESCRIPTION} />
      <PostList posts={posts} />
    </>
  );
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
