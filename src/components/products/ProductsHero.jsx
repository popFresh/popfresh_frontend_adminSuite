import { Search, RefreshCw, Plus } from "lucide-react";
import PageWrapper from "../layout/PageWrapper";

const ProductsHero = ({
  searchTerm,
  setSearchTerm,
  onRefresh,
  onAddProduct,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <PageWrapper
        title="Products"
        subtitle="Manage your products, pricing, inventory and product catalogue."
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
            placeholder="Search products..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:w-80"
          />

        </div>

        {/* Refresh */}

        <button
          onClick={onRefresh}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
        >
          <RefreshCw size={18} />
        </button>

        {/* Add Product */}

        <button
          onClick={onAddProduct}
          className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

    </div>
  );
};

export default ProductsHero;