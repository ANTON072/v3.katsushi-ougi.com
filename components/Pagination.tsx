import { FC, useMemo, useState } from "react";
import clsx from "clsx";

export type PaginationProps = {
  totalPages: number;
  current: number;
};

const PaginationItem: FC<{
  label: number;
  current: number;
  onClick: () => void;
}> = ({ label, current, onClick }) => {
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

const Pagination: FC<PaginationProps> = ({ totalPages, current }) => {
  const [current_, setCurrent] = useState(current);

  return (
    <div className="flex font-en">
      <PrevNext
        label="prev"
        current={current_}
        totalPages={totalPages}
        onClick={() => setCurrent(current_ - 1)}
      />
      {[...Array(totalPages)].map((n, index) => {
        const label = index + 1;
        return (
          <PaginationItem
            key={index}
            label={label}
            current={current_}
            onClick={() => {
              setCurrent(label);
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
