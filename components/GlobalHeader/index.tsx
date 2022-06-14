import { FC } from "react";

import Navigation, { NavigationProps } from "./Navigation";
import SiteTitle, { SiteTitleProps } from "./SiteTitle";

export type GlobalHeaderProps = {
  siteTitle: SiteTitleProps;
  navigation: NavigationProps;
};

const GlobalHeader: FC<GlobalHeaderProps> = ({ siteTitle, navigation }) => {
  return (
    <header className="bg-[color:var(--grey1)]">
      <div className="flex flex-col px-[var(--padding)] lg:justify-between lg:pl-[calc(var(--padding)*2)] lg:pr-[calc(var(--padding))] lg:h-[var(--header-height)] lg:max-w-[var(--max-width)] lg:mx-auto lg:flex-row">
        <div className="pt-[var(--padding)] lg:pt-[calc(var(--padding)*2-5px)]">
          <SiteTitle {...siteTitle} />
        </div>
        <Navigation {...navigation} />
      </div>
    </header>
  );
};

export default GlobalHeader;
