import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import PostBody from "../components/article/PostBody";
import PostTitle from "../components/article/PostTitle";
import { canUseServerSideFeatures } from "../libs/next.env";
import fetch from "../libs/polyfill/fetch";
import { WPPost } from "../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../libs/wpapi/UrlBuilder";
import { listAllPosts } from "../libs/wpUtils";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1);

const SinglePost: NextPage<{ post: WPPost | null }> = ({ post }) => {
  const link = useMemo(() => {
    if (!post) return "";
    return `/${post.slug}`;
  }, [post]);

  console.log("post", post);

  if (!post) return null;

  return (
    <>
      <PostTitle
        title={post.title.rendered}
        link={link}
        createdAt={post.date}
      />
      <PostBody body={post.content.rendered} />
    </>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await listAllPosts(urlBuilder);
  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
        slug: decodeURI(post.slug),
      },
    })),
    fallback: canUseServerSideFeatures() ? "blocking" : false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (() => {
    if (!params || !params.slug) return undefined;
    if (typeof params.slug === "string") return params.slug;

    return params.slug[0];
  })();

  if (!slug) {
    return {
      props: {
        post: null,
      },
    };
  }

  const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL).postType(
    "posts"
  );
  const post = await fetch(urlBuilder.slug(slug).getURL());
  return {
    props: {
      post: post[0],
    },
  };
};
