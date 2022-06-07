import { FC } from "react";
import { WPPost } from "../../libs/wpapi/interfaces";

type Props = {
  post: WPPost;
};

const PostListItem: FC<Props> = ({ post }) => {
  return (
    <div className="mb-[var(--padding)] md:mb-[calc(var(--padding)*2)]">
      <div className="pb-[1rem] mb-[1rem] border-b-[1px] border-b-solid border-b-[color:var(--grey3)] md:mb-[var(--padding)] md:pb-[var(--padding)]">
        <h2 className="text-[1.75rem] font-bold">{post.title.rendered}</h2>
      </div>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{
          __html: post.excerpt.rendered,
        }}
      />
    </div>
  );
};

export default PostListItem;
