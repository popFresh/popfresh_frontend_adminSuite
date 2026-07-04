import InventoryRow from "./InventoryRow";

const InventoryTable = ({
  inventory = [],
  onUpdate,
}) => {
  if (inventory.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-[#18211D]
          p-12
          text-center
          shadow-sm
        "
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No Inventory Found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          No products match your current search.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-[#18211D]
        shadow-sm
      "
    >
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111916]">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                SKU
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current Stock
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Reorder Level
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Last Updated
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {inventory.map((item) => (
              <InventoryRow
                key={item.id}
                item={item}
                onUpdate={onUpdate}
              />
            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-[#18211D]
          px-6
          py-4
        "
      >

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {inventory.length}
          </span>{" "}
          products
        </p>


           {/* Removing Export, will add later when required   */}
        {/* <button
          className="
            rounded-xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-[#18211D]
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
            dark:text-white
            transition-all
            duration-300
            hover:border-orange-300
            hover:bg-orange-50
            dark:hover:bg-[#111916]
            hover:text-orange-600
          "
        >
          Export
        </button> */}

      </div>

    </div>
  );
};

export default InventoryTable;