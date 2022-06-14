import { FC } from "react";
import Link from "next/link";

import PostMeta, { PostMetaProps } from "./PostMeta";
import { WPTag2 } from "../../libs/wpapi/interfaces";

type Props = {
  link: string;
  title: string;
  createdAt: PostMetaProps["createdAt"];
  tags: WPTag2[];
};

const PostTitle: FC<Props> = ({ link, title, createdAt, tags }) => {
  return (
    <div className="pb-[1rem] mb-[1rem] border-b-solid border-b-[1px] border-b-[color:var(--grey3)] lg:mb-[var(--padding)] lg:pb-[var(--padding)]">
      <h2 className="text-[1.75rem] font-bold">
        <Link href={link}>
          <a
            className="lg:hover:text-[color:var(--red)]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </Link>
      </h2>
      <PostMeta createdAt={createdAt} tags={tags} />
    </div>
  );
};

export default PostTitle;
