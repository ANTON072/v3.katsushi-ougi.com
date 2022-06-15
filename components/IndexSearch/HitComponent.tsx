import { FC } from "react";
import { Hit } from "react-instantsearch-core";

interface HitDoc {
  objectID: string;
  slug: string;
  title: string;
  content: string;
}

interface Props {
  hit: Hit<HitDoc>;
}

const HitComponent: FC<Props> = ({ hit }) => {
  return (
    <a
      href={`/${hit.slug}`}
      className="hover:text-[color:var(--red)] p-[1.5rem] block w-[100%]"
      dangerouslySetInnerHTML={{
        __html: hit.title,
      }}
    />
  );
};

export default HitComponent;
