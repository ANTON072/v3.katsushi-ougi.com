import { useMemo } from "react";
import About from "./About";
import Topics from "./Topics";
import useTags from "../../libs/hooks/useTags";
import { useMount } from "react-use";
import FixedSidebar from "../../libs/FixedSidebar";

const initialize = () => {
  if (window !== undefined) {
    const fixedSidebar = new FixedSidebar();

    if (window.matchMedia("(min-width: 992px)").matches) {
      /** PC用ブレークポイント */
      fixedSidebar.scrollTrigger.enable();
    } else {
      /** SP用ブレークポイント */
      fixedSidebar.scrollTrigger.disable();
    }
  }
};

const Sidebar = () => {
  const { tags } = useTags();

  useMount(() => {
    if (window !== undefined) {
      const mediaQueryList = window.matchMedia("(max-width:767px)");
      mediaQueryList.addEventListener("change", initialize);
      mediaQueryList.dispatchEvent(new Event("change"));
    }
  });

  const tagItems = useMemo(() => {
    return tags.map((tag) => ({
      label: tag.name,
      href: `/tags/${tag.slug}`,
      count: tag.count,
    }));
  }, [tags]);

  return (
    <aside className="pt-[var(--padding)] border-t-[1px] border-t-solid border-t-[color:var(--grey3)] md:w-[var(--sidebar-width)] md:pt-0 md:pl-[var(--padding)] md:border-t-0">
      <div id="sidebar_contents">
        <About />
        <Topics items={tagItems} />
      </div>
    </aside>
  );
};

export default Sidebar;
