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
      <div className="flex flex-col px-[var(--padding)] md:justify-between md:pl-[var(--padding)] md:pr-[calc(var(--padding)*2)] md:h-[var(--header-height)] md:max-w-[var(--max-width)] md:mx-auto md:flex-row">
        <div className="pt-[var(--padding)] md:pt-[calc(var(--padding)*2-5px)]">
          <SiteTitle {...siteTitle} />
        </div>
        <Navigation {...navigation} />
      </div>
    </header>
  );
};

export default GlobalHeader;
