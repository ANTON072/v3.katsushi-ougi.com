import { FC } from "react";
import Link from "next/link";

type Props = {
  link: string;
};

const PostReadMore: FC<Props> = ({ link }) => {
  return (
    <div>
      <Link href={link}>
        <a className="text-link">READ MORE »</a>
      </Link>
    </div>
  );
};

export default PostReadMore;
