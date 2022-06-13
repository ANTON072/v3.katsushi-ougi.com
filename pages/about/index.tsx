import { GetStaticProps, NextPage } from "next";
import { PostBody } from "../../components/article";
import Heading from "../../components/Heading";
import fetch from "../../libs/polyfill/fetch";
import { WPPost } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("pages")
  .slug("about");

const AboutPage: NextPage<{ page: WPPost }> = ({ page }) => {
  return (
    <>
      <Heading title="about" />
      <PostBody body={page.content.rendered} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const page = await fetch(urlBuilder.getURL());

  return {
    props: {
      page: page[0],
    },
  };
};

export default AboutPage;
