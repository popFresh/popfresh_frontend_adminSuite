import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  pagination,
  onPageChange,
}) => {
  const {
    page,
    totalPages,
    limit,
  } = pagination;

  // Generic total count
  const total =
    pagination.totalOrders ??
    pagination.totalCustomers ??
    pagination.totalProducts ??
    pagination.totalPayments ??
    0;

  if (totalPages <= 1) return null;

  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const from = Math.max(2, page - 1);
    const to = Math.min(totalPages - 1, page + 1);

    for (let i = from; i <= to; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className="
        mt-6
        flex
        flex-col
        gap-5
        rounded-2xl
        border
        border-[#D8D5CD]
        bg-white
        px-6
        py-5
        dark:border-[#2A3933]
        dark:bg-[#18211D]
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Left */}

      <p className="text-sm text-slate-600 dark:text-[#AEB7B3]">

        Showing{" "}

        <span className="font-semibold">
          {start}
        </span>{" "}

        -{" "}

        <span className="font-semibold">
          {end}
        </span>{" "}

        of{" "}

        <span className="font-semibold">
          {total}
        </span>

      </p>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-2">

        {/* Previous */}

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-medium
            transition
            ${
              page === 1
                ? `
                  cursor-not-allowed
                  border-slate-200
                  text-slate-400
                  dark:border-[#2A3933]
                  dark:text-[#5F6B65]
                `
                : `
                  border-[#D8D5CD]
                  bg-white
                  text-slate-700
                  hover:border-orange-300
                  hover:bg-orange-50
                  dark:border-[#2A3933]
                  dark:bg-[#18211D]
                  dark:text-[#E7ECEA]
                  dark:hover:bg-[#22302A]
                `
            }
          `}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {/* Page Numbers */}

        {getPages().map((item, index) =>
          item === "..." ? (
            <span
              key={index}
              className="px-2 text-slate-500 dark:text-[#AEB7B3]"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`
                h-11
                w-11
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  item === page
                    ? `
                      bg-orange-500
                      text-white
                    `
                    : `
                      border
                      border-[#D8D5CD]
                      bg-white
                      text-slate-700
                      hover:border-orange-300
                      hover:bg-orange-50
                      dark:border-[#2A3933]
                      dark:bg-[#18211D]
                      dark:text-[#E7ECEA]
                      dark:hover:bg-[#22302A]
                    `
                }
              `}
            >
              {item}
            </button>
          )
        )}

        {/* Next */}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-medium
            transition
            ${
              page === totalPages
                ? `
                  cursor-not-allowed
                  border-slate-200
                  text-slate-400
                  dark:border-[#2A3933]
                  dark:text-[#5F6B65]
                `
                : `
                  border-[#D8D5CD]
                  bg-white
                  text-slate-700
                  hover:border-orange-300
                  hover:bg-orange-50
                  dark:border-[#2A3933]
                  dark:bg-[#18211D]
                  dark:text-[#E7ECEA]
                  dark:hover:bg-[#22302A]
                `
            }
          `}
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default Pagination;