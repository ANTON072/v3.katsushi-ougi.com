import Link from "next/link";
import { FC, Fragment } from "react";
import { WPPost, WPTag2 } from "../../libs/wpapi/interfaces";
import { formatPostDateToString } from "../../libs/wpUtils";

export type PostMetaProps = {
  createdAt?: WPPost["date"];
  tags: WPTag2[];
};

const PostMeta: FC<PostMetaProps> = ({ createdAt, tags }) => {
  return (
    <div className="mt-[calc(var(--padding)/2)] flex lg:flex-row">
      <time className="pr-[0.5em] mr-[0.5em] border-r-[1px] border-r-solid border-r-grey3">
        {formatPostDateToString(createdAt)}
      </time>
      <div className="text-link">
        <span className="pr-[10px]">タグ:</span>
        {tags.map((tag, index) => (
          <Fragment key={tag.term_id}>
            <Link href={`/tags/${tag.slug}`}>
              <a>{tag.name}</a>
            </Link>
            {index < tags.length - 1 && <> , </>}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default PostMeta;
