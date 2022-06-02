import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";

export type NavigationProps = {
  list: { label: string; href: string; active: boolean }[];
};

const Navigation: FC<NavigationProps> = ({ list }) => {
  return (
    <ul className="uppercase font-en text-[20px] font-[700] flex leading-[1]">
      {list.map(({ label, href, active }) => (
        <li key={label}>
          <Link href={href}>
            <a
              className={clsx(
                "flex",
                "flex-col",
                "justify-end",
                "h-[144px]",
                "px-[var(--padding)]",
                active && "bg-[color:var(--grey2)]",
                "after:block",
                "after:h-[29px]",
                "after:content-['']",
                "hover:bg-[color:var(--grey2)]",
                "hover:transition-background",
                "hover:ease-linear",
                "hover:duration-[0.2s]"
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
