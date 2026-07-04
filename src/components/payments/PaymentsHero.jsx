import { Search, RefreshCw } from "lucide-react";
import PageWrapper from "../layout/PageWrapper";

const PaymentsHero = ({
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
  onRefresh,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <PageWrapper
        title="Payments"
        subtitle="Track customer payments, settlements and transaction history."
      />

      {/* Right */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

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
            placeholder="Search receipt, customer, phone..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-orange-400
              focus:ring-4
              focus:ring-orange-100
              sm:w-72
            "
          />

        </div>

        {/* Status Filter */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            h-11
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            text-slate-700
            outline-none
            transition-all
            focus:border-orange-400
            focus:ring-4
            focus:ring-orange-100
          "
        >
          <option value="">All Payments</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>

        {/* Refresh */}

        <button
          onClick={onRefresh}
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
          "
        >
          <RefreshCw size={18} />
        </button>

      </div>

    </div>
  );
};

export default PaymentsHero;