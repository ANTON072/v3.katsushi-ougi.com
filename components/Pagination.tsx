import { FC, useMemo, useState } from "react";
import clsx from "clsx";

export type PaginationProps = {
  totalPages: number;
  current: number;
};

const PaginationItem: FC<{
  label: number | string;
  current: number;
  onClick: () => void;
}> = ({ label, current, onClick }) => {
  if (typeof label === "string") {
    return <div className="min-w-[32px] mx-[3px] text-center">{label}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "text-[13px]",
        "h-[32px]",
        "min-w-[32px]",
        "border",
        "border-solid",
        "border-white",
        "rounded-[4px]",
        "mx-[3px]",
        "hover:bg-[color:var(--grey3)]",
        current === label && "bg-[color:var(--grey3)]"
      )}
    >
      {label}
    </button>
  );
};

const PrevNext: FC<{
  label: string;
  onClick: () => void;
  current: number;
  totalPages: number;
}> = ({ onClick, label, current, totalPages }) => {
  const disabled = useMemo(() => {
    if (label === "prev") {
      return current === 1;
    }
    return current === totalPages;
  }, [current, totalPages, label]);

  return (
    <button
      className={clsx(
        "h-[32px]",
        "min-w-[32px]",
        "border",
        "border-solid",
        "border-white",
        "rounded-[4px]",
        "mx-[3px]",
        "hover:bg-[color:var(--grey3)]",
        disabled && "opacity-[0.3]",
        disabled && "pointer-events-none"
      )}
      onClick={onClick}
    >
      {label === "prev" ? "«" : "»"}
    </button>
  );
};

const DIVIDE_NUMBER = 5;

const Pagination: FC<PaginationProps> = ({ totalPages, current }) => {
  const pageList = [...Array(totalPages)].map((_, i) => i + 1);

  const [current_, setCurrent] = useState(current);

  const formatPageList = useMemo(() => {
    const list = pageList.slice(0, DIVIDE_NUMBER);

    return [...list, "…", totalPages];
  }, [pageList, totalPages]);

  console.log("formatPageList", formatPageList);

  return (
    <div className="flex font-en">
      <PrevNext
        label="prev"
        current={current_}
        totalPages={totalPages}
        onClick={() => setCurrent(current_ - 1)}
      />
      {formatPageList.map((n) => {
        const label = n;
        return (
          <PaginationItem
            key={n}
            label={label}
            current={current_}
            onClick={() => {
              if (typeof n !== "string") {
                setCurrent(n);
              }
            }}
          />
        );
      })}
      <PrevNext
        label="next"
        current={current_}
        totalPages={totalPages}
        onClick={() => setCurrent(current_ + 1)}
      />
    </div>
  );
};

export default Pagination;
