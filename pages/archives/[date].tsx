import { default as dayjs } from "dayjs";

import { canUseServerSideFeatures } from "../../libs/next.env";
import { WPPost } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";
import { listAllPosts } from "../../libs/wpUtils";
import { GetStaticProps, NextPage } from "next";
import { PostList } from "../../components/article";
import Heading from "../../components/Heading";
import { NextSeo } from "next-seo";
import { SITE_TITLE } from "../../config";
import fetch from "../../libs/polyfill/fetch";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL).postType(
  "posts"
);

const DateArchivePage: NextPage<{
  posts: WPPost[];
  date: string;
}> = ({ date, posts }) => {
  return (
    <div>
      <NextSeo
        title={`ARCHIVES: ${date} - ${SITE_TITLE}`}
        description={`${date}のアーカイブ一覧ページです`}
      />
      <Heading title={`ARCHIVES: ${date}`} />
      <PostList posts={posts || []} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const dateList: string[] = [];

  const posts = await listAllPosts(urlBuilder);

  posts.forEach((post) => {
    const date = dayjs(post.date).format("YYYY-MM");
    if (!dateList.includes(date)) {
      dateList.push(date);
    }
  });

  return {
    paths: dateList.map((d) => ({
      params: {
        id: d,
        date: d,
      },
    })),
    fallback: canUseServerSideFeatures() ? "blocking" : false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.date) {
    return {
      props: {
        posts: [],
      },
    };
  }

  const nextMonth = dayjs(params.date as string)
    .add(1, "month")
    .format("YYYY-MM");
  const after = `${params.date}-01T00:00:00`;
  const before = `${nextMonth}-01T00:00:00`;

  const posts = await fetch(
    urlBuilder.startAt(1).perPage(100).after(after).before(before).getURL()
  );

  console.log("posts", urlBuilder.getURL());
  console.log("----------------------------------");

  return {
    props: {
      date: params.date,
      posts,
    },
  };
};

export default DateArchivePage;
