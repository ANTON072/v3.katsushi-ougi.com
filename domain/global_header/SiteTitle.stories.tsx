import SiteTitle from "./SiteTitle";

export default {
  title: "global_header/SiteTitle",
  component: SiteTitle,
};

export const Primary = () => (
  <SiteTitle
    title="katsushi-ougi.com"
    href="/"
    description="on web development"
  />
);
