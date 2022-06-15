import { ButtonHTMLAttributes, FC } from "react";

const LaunchButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      type="button"
      className="hidden sm:flex items-center w-[100%] text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 shadow-sm rounded-lg text-[color:var(--grey1)]"
      {...props}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-none text-slate-300 dark:text-slate-400"
        aria-hidden="true"
      >
        <path d="m19 19-3.5-3.5"></path>
        <circle cx="11" cy="11" r="6"></circle>
      </svg>
      <span className="flex-auto">記事を検索</span>
    </button>
  );
};

export default LaunchButton;
