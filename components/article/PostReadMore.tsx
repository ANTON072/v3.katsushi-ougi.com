import { FC } from "react";
import Link from "next/link";

type Props = {
  link: string;
};

const PostReadMore: FC<Props> = ({ link }) => {
  return (
    <div className="text-link">
      <Link href={link}>
        <a>READ MORE »</a>
      </Link>
    </div>
  );
};

export default PostReadMore;
