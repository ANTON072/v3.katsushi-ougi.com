import { useEffect, useMemo, useState } from "react";

import About from "./About";
import Topics from "./Topics";
import useTags from "../../libs/hooks/useTags";
import FixedSidebar from "../../libs/FixedSidebar";
import LaunchButton from "../IndexSearch/LaunchButton";
import IndexSearchDialog from "../IndexSearch/IndexSearchDialog";
import { useMedia, useMount } from "react-use";
import { useRouter } from "next/router";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const Sidebar = () => {
  const { tags } = useTags();

  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);

  const isWide = useMedia("(min-width: 1024px)");

  const [fixedSidebar, setFixedSidebar] = useState<FixedSidebar>();

  useEffect(() => {
    if (window === undefined || !fixedSidebar) return;
    if (isWide) {
      fixedSidebar.scrollTrigger.enable();
    } else {
      fixedSidebar.scrollTrigger.disable();
    }
  }, [isWide, fixedSidebar]);

  useMount(() => {
    if (window === undefined) return;
    setFixedSidebar(new FixedSidebar());
  });

  useEffect(() => {
    if (window === undefined || !fixedSidebar) return;
    fixedSidebar.scrollTrigger.refresh();
  }, [router.pathname, fixedSidebar]);

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
                window.dataLayer.push({
                  event: "on_click_search",
                });
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
