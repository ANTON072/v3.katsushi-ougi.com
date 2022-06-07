import Link from "next/link";
import { FC } from "react";

type Item = {
  label: string;
  href: string;
  count: number;
};

export type TopicsProps = {
  items: Item[];
};

const Topics: FC<TopicsProps> = ({ items }) => {
  return (
    <div>
      <h2 className="mb-[calc(var(--padding)/4)] font-[700] font-en text-[24px]">
        TOPICS
      </h2>
      <ul className="pl-[1em] list-disc">
        {items.map(({ label, href, count }) => (
          <li key={label} className="leading-[1.7]">
            <>
              <Link href={href}>
                <a className="text-link">{label}</a>
              </Link>
              <span className="pl-[5px]">({count})</span>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
