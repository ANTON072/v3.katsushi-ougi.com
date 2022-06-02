import { FC } from "react";

type Props = {
  title: string;
  description?: string;
};

const SiteTitle: FC<Props> = ({ title, description }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
};

export default SiteTitle;
