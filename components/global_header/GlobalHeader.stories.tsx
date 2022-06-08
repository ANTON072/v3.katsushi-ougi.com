import { title } from "process";
import GlobalHeader from "./GlobalHeader";

export default {
  title: "global_header/GlobalHeader",
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
