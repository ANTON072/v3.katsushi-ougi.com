import GlobalHeader from ".";

export default {
  title: "GlobalHeader",
  component: GlobalHeader,
};

export const Primary = () => (
  <GlobalHeader
    siteTitle={{
      title: "katsushi-ougi.com",
      href: "/",
      description: "on web development",
    }}
    navigation={{
      list: [
        {
          label: "home",
          href: "/",
          active: true,
        },
        {
          label: "articles",
          href: "/",
          active: false,
        },
        {
          label: "about",
          href: "/",
          active: false,
        },
      ],
    }}
  />
);
