import { useMemo, useState } from "react";
import About from "./About";
import Topics from "./Topics";
import useTags from "../../libs/hooks/useTags";
import { useMount } from "react-use";
import FixedSidebar from "../../libs/FixedSidebar";
import LaunchButton from "../IndexSearch/LaunchButton";
import IndexSearchDialog from "../IndexSearch/IndexSearchDialog";

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

  const [showDialog, setShowDialog] = useState(false);

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
    <>
      <aside className="pt-[var(--padding)] border-t-[1px] border-t-solid border-t-[color:var(--grey3)] lg:w-[var(--sidebar-width)] lg:pt-0 lg:pl-[var(--padding)] lg:border-t-0">
        <div id="sidebar_contents">
          <div className="mb-[15px]">
            <LaunchButton
              onClick={() => {
                setShowDialog(!showDialog);
              }}
            />
          </div>
          <About />
          <Topics items={tagItems} />
        </div>
      </aside>
      <IndexSearchDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
};

export default Sidebar;
