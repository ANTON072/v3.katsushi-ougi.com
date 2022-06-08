import { FC } from "react";
import { WPPost } from "../../libs/wpapi/interfaces";
import { formatPostDateToString } from "../../libs/wpUtils";

export type PostMetaProps = {
  createdAt?: WPPost["date"];
};

const PostMeta: FC<PostMetaProps> = ({ createdAt }) => {
  return (
    <div className="mt-[calc(var(--padding)/2)] flex md:flex-row">
      <time className="pr-[0.5em] mr-[0.5em] border-r-[1px] border-r-solid border-r-grey3">
        {formatPostDateToString(createdAt)}
      </time>
      <div>
        タグ:
        <a href="https://katsushi-ougi.com/tag/react/" rel="tag">
          react
        </a>
        ,
        <a href="https://katsushi-ougi.com/tag/recoil/" rel="tag">
          recoil
        </a>
        ,
        <a href="https://katsushi-ougi.com/tag/svg/" rel="tag">
          svg
        </a>
      </div>
    </div>
  );
};

export default PostMeta;
