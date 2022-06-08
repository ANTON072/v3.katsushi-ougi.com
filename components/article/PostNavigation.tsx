import Link from "next/link";
import { FC } from "react";
import { PrevNextPage } from "../../libs/wpapi/interfaces";

type Props = {
  prev?: PrevNextPage;
  next?: PrevNextPage;
};

const PostNavigation: FC<Props> = ({ prev, next }) => {
  return (
    <nav className="text-link flex justify-between pt-[var(--padding)] border-t-solid border-t-[1px] border-t-[color:var(--grey3)] mb-[var(--padding)] md:my-[calc(var(--padding)*2)]">
      <div>
        {!!prev && (
          <Link href={prev.post_name}>
            <a>« PREV</a>
          </Link>
        )}
      </div>
      <div>
        {!!next && (
          <Link href={next.post_name}>
            <a>NEXT »</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PostNavigation;
