import About from "./About";
import Topics from "./Topics";

const Sidebar = () => {
  return (
    <aside className="pt-[var(--padding)] border-t-[1px] border-t-solid border-t-[color:var(--grey3)] md:w-[var(--sidebar-width)] md:pt-0 md:pl-[var(--padding)] md:border-t-0">
      <About />
      <Topics
        items={[
          {
            label: "typescript",
            href: "/",
            count: 15,
          },
          {
            label: "typescript1",
            href: "/",
            count: 15,
          },
          {
            label: "typescript2",
            href: "/",
            count: 15,
          },
        ]}
      />
    </aside>
  );
};

export default Sidebar;
