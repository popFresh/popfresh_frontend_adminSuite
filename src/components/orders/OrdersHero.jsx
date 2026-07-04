import {
  Search,
  
  RefreshCw,
  X,
} from "lucide-react";

import PageWrapper from "../layout/PageWrapper";

const OrdersHero = ({
  searchTerm,
  setSearchTerm,
  onRefresh,
  
  refreshing = false,
  
}) => {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}

      <PageWrapper
        title="Orders"
        subtitle="Manage, process and track customer orders from one place."
      />

      {/* Right */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search receipt, customer or phone..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-11
              text-sm
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-orange-400
              focus:ring-4
              focus:ring-orange-100
              sm:w-80
            "
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-full
                p-1
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              <X size={16} />
            </button>
          )}
        </div>

        

        {/* Refresh */}

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            transition-all
            hover:border-orange-300
            hover:bg-orange-50
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <RefreshCw
            size={18}
            className={refreshing ? "animate-spin" : ""}
          />
        </button>

      </div>
    </div>
  );
};

export default OrdersHero;