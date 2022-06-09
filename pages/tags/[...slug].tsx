import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PostList from "../../components/article/PostList";
import { PER_PAGE_NUM } from "../../config";
import { canUseServerSideFeatures } from "../../libs/next.env";
import fetch from "../../libs/polyfill/fetch";
import { WPPost } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";
import { listAllPosts, listAllTags } from "../../libs/wpUtils";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("tags")
  .startAt(1);

const TagListPage: NextPage<{ posts: WPPost[]; name: string }> = ({
  posts,
  name,
}) => {
  return (
    <div>
      <h2 className="text-[35px] mb-[1em]">Tag: {name}</h2>
      <PostList posts={posts} />
    </div>
  );
};

export default TagListPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await listAllTags(urlBuilder);

  const firstList = tags.map((tag) => ({
    params: {
      id: `${tag.id}`,
      slug: [tag.slug],
    },
  }));

  const postsUrlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
    .postType("posts")
    .startAt(1)
    .perPage(100);

  const posts = await listAllPosts(postsUrlBuilder);

  for (const tag of tags) {
    const targetPosts = posts.filter((post) => {
      const tagIds = post.tags.map((t) => t.term_id);

      return tagIds.includes(tag.id);
    });
    console.log("-----------------------------");
    console.log("tag", tag.id);
    // ページ数
    console.log("pages", Math.ceil(targetPosts.length / PER_PAGE_NUM));
  }

  return {
    paths: firstList,
    fallback: canUseServerSideFeatures() ? "blocking" : false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug) {
    return {
      props: {
        posts: [],
      },
    };
  }

  const slug = params.slug[0];

  const tags = await listAllTags(urlBuilder);

  const targetTag = tags.filter((tag) => tag.slug === slug);

  const postsUrlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
    .postType("posts")
    .perPage(PER_PAGE_NUM)
    .startAt(1)
    .tags([targetTag[0].id]);

  const posts = await fetch<WPPost[]>(postsUrlBuilder.getURL());

  return {
    props: {
      name: targetTag[0].name,
      posts,
    },
  };
};
