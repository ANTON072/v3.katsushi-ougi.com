import { useEffect, useMemo, useState } from "react";
import About from "./About";
import Topics from "./Topics";
import useTags from "../../libs/hooks/useTags";
import FixedSidebar from "../../libs/FixedSidebar";
import LaunchButton from "../IndexSearch/LaunchButton";
import IndexSearchDialog from "../IndexSearch/IndexSearchDialog";
import { useMedia } from "react-use";

const Sidebar = () => {
  const { tags } = useTags();

  const [showDialog, setShowDialog] = useState(false);

  const isWide = useMedia("(min-width: 1024px)");

  useEffect(() => {
    if (window !== undefined) {
      const fixedSidebar = new FixedSidebar();
      if (isWide) {
        fixedSidebar.scrollTrigger.enable();
      } else {
        fixedSidebar.scrollTrigger.kill();
      }
    }
  }, [isWide]);

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
