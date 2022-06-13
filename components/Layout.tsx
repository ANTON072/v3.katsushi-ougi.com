import React, { FC, useMemo } from "react";
import Script from "next/script";

import GlobalFooter from "./GlobalFooter";
import GlobalHeader from "./GlobalHeader";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { asPath } = useRouter();

  const activeNav = useMemo(() => {
    if (asPath === "/") return "home";
    if (/^\/archives(.+)?$/.test(asPath)) return "archives";
    if (/^\/about(.+)?$/.test(asPath)) return "about";
    return "";
  }, [asPath]);

  return (
    <div className="flex h-[100%] flex-col content-between">
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
              active: activeNav === "home",
            },
            {
              label: "archives",
              href: "/archives",
              active: activeNav === "archives",
            },
            {
              label: "about",
              href: "/about",
              active: activeNav === "about",
            },
          ],
        }}
      />
      <div className="flex-1 flex w-[100%] max-w-[var(--max-width)] px-[var(--padding)] mt-[var(--padding)] flex-col md:flex-row md:mt-[calc(var(--padding)*2)] md:mx-auto">
        <main
          id="main"
          className="flex-1 w-[100%] md:max-w-[calc(var(--max-width)-var(--sidebar-width)-var(--padding)*2)] md:pr-[calc(var(--padding)*2)] md:pl-[var(--padding)] md:border-r-solid md:border-r-[1px] md:border-r-[color:var(--grey3),width:1px]"
        >
          {children}
        </main>
        <Sidebar />
      </div>
      <GlobalFooter />
      {/* <Script src="/prism.js" /> */}
      <Script
        id="mkaz-code-syntax-prism-js-js-extra"
        dangerouslySetInnerHTML={{
          __html: `
var prism_settings = {"pluginUrl":"https:\/\/wp.katsushi-ougi.com\/wp-content\/plugins\/code-syntax-block\/"};
  `,
        }}
      />
    </div>
  );
};

export default Layout;
