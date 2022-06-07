import { useMemo } from "react";
import About from "./About";
import Topics from "./Topics";
import useTags from "./useTags";

const Sidebar = () => {
  const { tags } = useTags();

  const tagItems = useMemo(() => {
    return tags.map((tag) => ({
      label: tag.name,
      href: `/tags/${tag.slug}`,
      count: tag.count,
    }));
  }, [tags]);

  return (
    <aside className="pt-[var(--padding)] border-t-[1px] border-t-solid border-t-[color:var(--grey3)] md:w-[var(--sidebar-width)] md:pt-0 md:pl-[var(--padding)] md:border-t-0">
      <About />
      <Topics items={tagItems} />
    </aside>
  );
};

export default Sidebar;
