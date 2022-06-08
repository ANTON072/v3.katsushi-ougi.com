import { FC } from "react";

type Props = {
  body: string;
};

const PostBody: FC<Props> = ({ body }) => {
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{
        __html: body,
      }}
    />
  );
};

export default PostBody;
