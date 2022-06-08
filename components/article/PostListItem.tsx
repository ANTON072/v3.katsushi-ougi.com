import { FC, useMemo } from "react";
import { WPPost } from "../../libs/wpapi/interfaces";
import PostBody from "./PostBody";
import PostReadMore from "./PostReadMore";
import PostTitle from "./PostTitle";

type Props = {
  post: WPPost;
};

const PostListItem: FC<Props> = ({ post }) => {
  const link = useMemo(() => {
    return `/${post.slug}`;
  }, [post.slug]);

  return (
    <div className="mb-[var(--padding)] md:mb-[calc(var(--padding)*2)]">
      <PostTitle
        title={post.title.rendered}
        link={link}
        createdAt={post.date}
      />
      <PostBody body={post.excerpt.rendered} />
      <PostReadMore link={link} />
    </div>
  );
};

export default PostListItem;
