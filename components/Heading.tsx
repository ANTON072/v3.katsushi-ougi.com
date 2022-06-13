import { FC } from "react";

const Heading: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="uppercase pb-[var(--padding)] mb-[var(--padding)] border-b-[1px] border-b-solid border-b-[color:var(--grey3)]">
      <h2>{title}</h2>
    </div>
  );
};

export default Heading;
