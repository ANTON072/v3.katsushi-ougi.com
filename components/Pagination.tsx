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

const MAX_LIST_LENGTH = 7;
const MAX_PAGE_RANGE = 4;
const MIN_PAGE_RANGE = 3;

const Pagination: FC<PaginationProps> = ({ totalPages, current }) => {
  const pageList = [...Array(totalPages)].map((_, i) => i + 1);

  const [current_, setCurrent] = useState(current);

  // 必ず配列は7となる
  const formatPageList = useMemo(() => {
    if (pageList.length <= MAX_LIST_LENGTH) return pageList;

    let rangeStart = current_ - 2;
    let rangeEnd = rangeStart + MAX_PAGE_RANGE - 1;

    if (current_ <= MAX_PAGE_RANGE) {
      rangeStart = 0;
      rangeEnd = MAX_PAGE_RANGE + 1;
    }

    if (current_ >= totalPages - MIN_PAGE_RANGE) {
      rangeStart = totalPages - MAX_PAGE_RANGE - 1;
      rangeEnd = totalPages;
    }

    let list: (number | string)[] = pageList.slice(rangeStart, rangeEnd);

    if (list[0] === 1) {
      list = [...list, ...["…", totalPages]];
    } else if (list[list.length - 1] === totalPages) {
      list = [...[1, "…"], ...list];
    } else {
      list = [...[1, "…"], ...list, ...["…", totalPages]];
    }

    return list;
  }, [current_, totalPages, pageList]);

  return (
    <div className="flex font-en">
      <PrevNext
        label="prev"
        current={current_}
        totalPages={totalPages}
        onClick={() => setCurrent(current_ - 1)}
      />
      {formatPageList.map((n, index) => {
        const label = n;
        return (
          <PaginationItem
            key={index}
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
