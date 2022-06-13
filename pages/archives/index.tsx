import { GetStaticProps, NextPage } from "next";
import Heading from "../../components/Heading";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";
import { listAllPosts } from "../../libs/wpUtils";
import { default as dayjs } from "dayjs";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { SITE_TITLE } from "../../config";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1);

type DateParams = {
  label: string;
  size: number;
};

const ArchivesPage: NextPage<{ dates: DateParams[] }> = ({ dates }) => {
  return (
    <>
      <NextSeo
        title={`ARCHIVES - ${SITE_TITLE}`}
        description="アーカイブ一覧ページです"
      />
      <Heading title="Archives" />
      <ul className="flex flex-wrap m-[-15px]">
        {dates.map((d) => (
          <li key={d.label} className="m-[15px]">
            <Link href={`/archives/${d.label}`}>
              <a className="block p-[10px] bg-[color:var(--grey3)] round-[3px]">
                {d.label}
                <span className="ml-[5px]">({d.size})</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const dates: DateParams[] = [];

  const posts = await listAllPosts(urlBuilder);

  posts.forEach((post) => {
    const date = dayjs(post.date).format("YYYY-MM");
    const dateStr = dates.map((d) => d.label);
    if (!dateStr.includes(date)) {
      dates.push({
        label: date,
        size: 1,
      });
    } else {
      const target = dates.find((d) => d.label === date);
      if (target) {
        target.size += 1;
      }
    }
  });

  return {
    props: {
      dates: dates,
    },
  };
};

export default ArchivesPage;
