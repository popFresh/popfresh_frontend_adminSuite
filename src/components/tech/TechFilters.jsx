import {
  Search,
  Filter,
  CalendarDays,
  ArrowUpDown,
  RotateCw,
} from "lucide-react";

const levels = [
  "ALL",
  "INFO",
  "WARN",
  "ERROR",
  "CRITICAL",
];

const categories = [
  "ALL",
  "SYSTEM",
  "DATABASE",
  "PAYMENT",
  "ORDER",
  "EMAIL",
  "SHIPROCKET",
  "WHATSAPP",
  "CONTACT",
  "AUTH",
];

const dateOptions = [
  "ALL",
  "TODAY",
  "YESTERDAY",
  "LAST_7_DAYS",
  "LAST_30_DAYS",
];

const sortOptions = [
  {
    label: "Newest First",
    value: "NEWEST",
  },
  {
    label: "Oldest First",
    value: "OLDEST",
  },
];

const TechFilters = ({
  search,
  setSearch,

  level,
  setLevel,

  category,
  setCategory,

  dateRange,
  setDateRange,

  sort,
  setSort,

  resultCount,

  onRefresh,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Filters
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Search and filter your application logs.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          <RotateCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* Search */}

        <div className="xl:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Search size={16} />
            Search
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search title, message, category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black"
            />
          </div>
        </div>

        {/* Level */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            Level
          </label>

          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
          >
            {levels.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <CalendarDays size={16} />
            Date
          </label>

          <select
            value={dateRange}
            onChange={(e) =>
              setDateRange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
          >
            {dateOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item
                  .replaceAll("_", " ")
                  .toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-5 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {resultCount}
          </span>{" "}
          log{resultCount !== 1 && "s"}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowUpDown size={16} />
            Sort
          </div>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          >
            {sortOptions.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TechFilters;