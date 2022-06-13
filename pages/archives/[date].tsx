import { FC } from "react";
import { default as dayjs } from "dayjs";

import { canUseServerSideFeatures } from "../../libs/next.env";
import { WPPost } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";
import { listAllPosts } from "../../libs/wpUtils";
import { GetStaticProps, NextPage } from "next";
import { PostList } from "../../components/article";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1);

const DateArchivePage: NextPage<{
  posts: WPPost[];
  date: string;
}> = ({ date, posts }) => {
  console.log("posts", posts);
  return (
    <div>
      <h2 className="text-[35px] mb-[1em]">Date: {date}</h2>
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

  const posts = await listAllPosts(urlBuilder.after(after).before(before));

  return {
    props: {
      date: params.date,
      posts,
    },
  };
};

export default DateArchivePage;
