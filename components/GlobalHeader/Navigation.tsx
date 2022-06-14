import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";

export type NavigationProps = {
  list: { label: string; href: string; active: boolean }[];
};

const Navigation: FC<NavigationProps> = ({ list }) => {
  return (
    <ul className="uppercase font-en font-[700] flex leading-[1] my-[var(--padding)] ml-[-1rem] lg:text-[1.25rem] lg:relative lg:right-[calc(-1 * var(--padding))] lg:m-0">
      {list.map(({ label, href, active }) => (
        <li key={label}>
          <Link href={href}>
            <a
              className={clsx(
                "p-[1rem]",
                "block",
                "lg:flex",
                "lg:flex-col",
                "lg:justify-end",
                "lg:h-[144px]",
                "lg:px-[var(--padding)]",
                active && "bg-[color:var(--grey2)]",
                "lg:after:block",
                "lg:after:h-[29px]",
                "lg:after:content-['']",
                "lg:hover:bg-[color:var(--grey2)]",
                "lg:hover:transition-background",
                "lg:hover:ease-linear",
                "lg:over:duration-[0.2s]"
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
