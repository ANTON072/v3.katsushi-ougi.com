import { FC } from "react";
import Link from "next/link";

export type SiteTitleProps = {
  title: string;
  description?: string;
  href: string;
};

const SiteTitle: FC<SiteTitleProps> = ({ title, href, description }) => {
  return (
    <header className="font-en uppercase leading-[1] ">
      <h1 className="font-[700] tracking-[-1px] text-[1.875rem] lg:text-[3.125rem] lg:relative lg:left-[-3px]">
        <Link href={href}>
          <a>{title}</a>
        </Link>
      </h1>
      <p className="tracking-[2px] mt-[10px] lg:relative lg:left-[-1px]">
        {description}
      </p>
    </header>
  );
};

export default SiteTitle;
