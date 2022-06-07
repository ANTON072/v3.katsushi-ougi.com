import Navigation from "./Navigation";

export default {
  title: "global_header/Navigation",
  component: Navigation,
};

export const Primary = () => (
  <Navigation
    list={[
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
    ]}
  />
);
