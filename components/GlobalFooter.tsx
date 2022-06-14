import { FC } from "react";

const GlobalFooter: FC = () => {
  return (
    <footer className="p-[calc(var(--padding)*2)] uppercase text-center lg:w-[100%] lg:mx-auto lg:max-w-[var(--max-width)] lg:text-left">
      <p>©2022 katsushi-ougi.com</p>
    </footer>
  );
};

export default GlobalFooter;
