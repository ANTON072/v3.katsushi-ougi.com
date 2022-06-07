import Link from "next/link";
import { FC, useMemo } from "react";
import { WPPost } from "../../libs/wpapi/interfaces";

type Props = {
  post: WPPost;
};

const PostListItem: FC<Props> = ({ post }) => {
  const link = useMemo(() => {
    return `/${post.slug}`;
  }, [post.slug]);

  return (
    <div className="mb-[var(--padding)] md:mb-[calc(var(--padding)*2)]">
      <div className="pb-[1rem] mb-[1rem] border-b-[1px] border-b-solid border-b-[color:var(--grey3)] md:mb-[var(--padding)] md:pb-[var(--padding)]">
        <h2 className="text-[1.75rem] font-bold">
          <Link href={link}>
            <a className="md:hover:text-[color:var(--red)]">
              {post.title.rendered}
            </a>
          </Link>
        </h2>
      </div>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{
          __html: post.excerpt.rendered,
        }}
      />
      <div>
        <Link href={link}>
          <a className="text-link">READ MORE »</a>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
