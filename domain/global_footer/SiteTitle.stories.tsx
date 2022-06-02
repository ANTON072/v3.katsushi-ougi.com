import SiteTitle from "./SiteTitle";

export default {
  title: "global_footer/SiteTitle",
  component: SiteTitle,
};

export const Primary = () => (
  <SiteTitle title="katsushi-ougi.com" description="on web development" />
);
