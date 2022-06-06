import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";

export type NavigationProps = {
  list: { label: string; href: string; active: boolean }[];
};

const Navigation: FC<NavigationProps> = ({ list }) => {
  return (
    <ul className="uppercase font-en font-[700] flex leading-[1] my-[var(--padding)] ml-[-1rem] md:text-[1.25rem] md:relative md:right-[calc(-1 * var(--padding))] md:m-0">
      {list.map(({ label, href, active }) => (
        <li key={label}>
          <Link href={href}>
            <a
              className={clsx(
                "p-[1rem]",
                "block",
                "md:flex",
                "md:flex-col",
                "md:justify-end",
                "md:h-[144px]",
                "md:px-[var(--padding)]",
                active && "bg-[color:var(--grey2)]",
                "md:after:block",
                "md:after:h-[29px]",
                "md:after:content-['']",
                "md:hover:bg-[color:var(--grey2)]",
                "md:hover:transition-background",
                "md:hover:ease-linear",
                "md:over:duration-[0.2s]"
              )}
            >
              {label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
