import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";

import { PostList } from "../../components/article";
import { PER_PAGE_NUM, SITE_TITLE } from "../../config";
import { canUseServerSideFeatures } from "../../libs/next.env";
import { WPPost } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";
import { listAllPosts, listAllTags } from "../../libs/wpUtils";
import Pagination from "../../components/Pagination";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Heading from "../../components/Heading";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("tags")
  .startAt(1);

const postsUrlBuilder = WPAPIURLFactory.init(
  process.env.WORDPRESS_URL
).postType("posts");

const TagListPage: NextPage<{
  posts: WPPost[];
  name: string;
  page: number;
  totalPages: number;
}> = ({ posts, name, page, totalPages }) => {
  const router = useRouter();

  const handleChangePage = useCallback(
    (page: number) => {
      const routes = router.asPath.split("/").filter((p) => !!p);
      if (page === 1) {
        router.push(`/tags/${routes[1]}/`);
      } else {
        router.push(`/tags/${routes[1]}/${page}`);
      }
    },
    [router]
  );

  return (
    <div>
      <NextSeo
        title={`TAG ${name} - ${SITE_TITLE}`}
        description={`タグ${name}の一覧ページです`}
      />
      <Heading title={`Tag: ${name}`} />
      <PostList posts={posts || []} />
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            current={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default TagListPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await listAllTags(urlBuilder);

  const posts = await listAllPosts(postsUrlBuilder.startAt(1));

  const pageList = [];

  for (const tag of tags) {
    const targetPosts = posts.filter((post) => {
      const tagIds = post.tags.map((t) => t.term_id);

      return tagIds.includes(tag.id);
    });

    // タグページのページ数
    const pages = Math.ceil(targetPosts.length / PER_PAGE_NUM);

    // /tags/[:tag_slug]/[:page]のページを生成
    for (let i = 0; i < pages; i++) {
      if (i > 0) {
        pageList.push({
          params: {
            id: `${tag.id}`,
            slug: [tag.slug, `${i + 1}`],
          },
        });
      }
    }
  }

  // /tags/[:tag_slug]のページを生成
  const topPageList = tags.map((tag) => ({
    params: {
      id: `${tag.id}`,
      slug: [tag.slug],
    },
  }));

  return {
    paths: [...topPageList, ...pageList],
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

  const page = parseInt(params.slug[1], 10) || 1;

  const tags = await listAllTags(urlBuilder);

  const targetTag = tags.find((tag) => tag.slug === slug);

  if (!targetTag) {
    return {
      props: {
        posts: [],
      },
    };
  }

  const res = await unfetch(
    postsUrlBuilder.startAt(page).tags([targetTag.id]).getURL()
  );
  const headers = res.headers;
  const posts = await res.json();
  const totalPages = headers.get("x-wp-totalpages");

  return {
    props: {
      name: targetTag.name,
      posts,
      totalPages: totalPages ? parseInt(totalPages[0], 10) : 1,
      page,
    },
  };
};
