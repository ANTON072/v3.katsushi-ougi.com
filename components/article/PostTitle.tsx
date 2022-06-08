import { FC } from "react";
import Link from "next/link";

import PostMeta, { PostMetaProps } from "./PostMeta";

type Props = {
  link: string;
  title: string;
  createdAt: PostMetaProps["createdAt"];
};

const PostTitle: FC<Props> = ({ link, title, createdAt }) => {
  return (
    <div className="pb-[1rem] mb-[1rem] border-b-solid border-b-[1px] border-b-[color:var(--grey3)] md:mb-[var(--padding)] md:pb-[var(--padding)]">
      <h2 className="text-[1.75rem] font-bold">
        <Link href={link}>
          <a
            className="md:hover:text-[color:var(--red)]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </Link>
      </h2>
      <PostMeta createdAt={createdAt} />
    </div>
  );
};

export default PostTitle;
