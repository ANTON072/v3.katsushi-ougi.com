import { canUseServerSideFeatures } from "./next.env";
import { WPPost } from "./wpapi/interfaces";
import { WPAPIURLBuilder } from "./wpapi/UrlBuilder";
import fetch from "./polyfill/fetch";

/**
 * 記事の重複を防止
 */
const uniqWPPosts = (posts: WPPost[]): WPPost[] => {
  const ids: string[] = [];

  return posts.filter((post) => {
    if (ids.indexOf(post.id) > -1) return false;
    ids.push(post.id);
    return true;
  });
};

/**
 * 再帰して全記事を取得
 */
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

export { uniqWPPosts, listAllPosts };
