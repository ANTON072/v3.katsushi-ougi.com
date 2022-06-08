import { FC } from "react";
import { WPPost } from "../../libs/wpapi/interfaces";
import PostListItem from "./PostListItem";

type Props = {
  posts: WPPost[];
};

const PostList: FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
