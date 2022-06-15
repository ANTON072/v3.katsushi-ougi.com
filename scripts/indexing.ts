import algoliasearch from "algoliasearch";
import { WPAPIURLFactory } from "../libs/wpapi/UrlBuilder";
import { listAllPosts } from "../libs/wpUtils";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL as string)
  .postType("posts")
  .startAt(1);

(async () => {
  try {
    const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_SECRET_KEY as string;
    const ALGOLIA_INDEX_NAME = process.env
      .NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const posts = await listAllPosts(urlBuilder);

    const formattedPosts = posts.map((post) => ({
      objectID: post.id,
      slug: post.slug,
      title: post.title.rendered,
      content: post.content.rendered,
    }));

    index
      .saveObjects(formattedPosts)
      .wait()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
})();
