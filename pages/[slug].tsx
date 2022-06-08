import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { canUseServerSideFeatures } from "../libs/next.env";
import fetch from "../libs/polyfill/fetch";
import { WPPost } from "../libs/wpapi/interfaces";
import { WPAPIURLBuilder, WPAPIURLFactory } from "../libs/wpapi/UrlBuilder";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1);

const uniqWPPosts = (posts: WPPost[]): WPPost[] => {
  const ids: string[] = [];

  return posts.filter((post) => {
    if (ids.indexOf(post.id) > -1) return false;
    ids.push(post.id);
    return true;
  });
};

/** 再帰して全記事取得 */
const listAllPosts = async (
  APIURLBuilder: WPAPIURLBuilder,
  posts: WPPost[] = []
): Promise<WPPost[]> => {
  const perPage = 20;
  try {
    const url = APIURLBuilder.perPage(20).getURL();
    const response = await fetch(url);

    // エラーレスポンスの場合はレスポンスをスローして中断
    if (
      response instanceof Error ||
      (response.data && response.data.status && response.data.status > 399)
    ) {
      throw response;
    }

    // 記事の重複をカットする
    const mergedPosts = uniqWPPosts([...posts, ...response]);

    if (canUseServerSideFeatures() || response.length < perPage) {
      return mergedPosts;
    }

    // 次のページへ進む
    APIURLBuilder.nextPage();

    // 再帰の実行
    return listAllPosts(APIURLBuilder, mergedPosts);
  } catch (error) {
    // if (error.code && error.code === "rest_invalid_param") {
    //   return posts;
    // }

    throw error;
  }
};

const SinglePost: NextPage<{ post: WPPost | null }> = ({ post }) => {
  if (!post) return null;

  console.log("post", post);

  return (
    <>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
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
