import { FC } from "react";

const GlobalFooter: FC = () => {
  return (
    <footer className="py-[calc(var(--padding)*2)] px-[var(--padding)] uppercase text-center md:w-[100%] md:mx-auto md:max-w-[var(--max-width)] md:text-left">
      <p>©2022 katsushi-ougi.com</p>
    </footer>
  );
};

export default GlobalFooter;
