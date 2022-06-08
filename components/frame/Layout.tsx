import React, { FC } from "react";
import { GlobalFooter } from "../global_footer";

import { GlobalHeader } from "../global_header";
import { Sidebar } from "../sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
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
      <div className="flex-1 flex w-[100%] max-w-[var(--max-width)] px-[var(--padding)] mt-[var(--padding)] flex-col md:flex-row md:mt-[calc(var(--padding)*2)] md:mx-auto">
        <main className="flex-1 w-[100%] md:max-w-[calc(var(--max-width)-var(--sidebar-width)-var(--padding)*2)] md:pr-[calc(var(--padding)*2)] md:pl-[var(--padding)] md:border-r-solid md:border-r-[1px] md:border-r-[color:var(--grey3),width:1px]">
          {children}
        </main>
        <Sidebar />
      </div>
      <GlobalFooter />
    </div>
  );
};

export default Layout;
