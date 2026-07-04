import { Pencil } from "lucide-react";
import InventoryStatusBadge from "./InventoryStatusBadge";

const InventoryRow = ({ item, onUpdate }) => {
  return (
    <tr
      className="
        transition-all
        duration-200
        hover:bg-orange-50/40
        dark:hover:bg-[#111916]
      "
    >

      {/* Product */}

      <td className="px-6 py-5">

        <div>

          <h4 className="font-semibold text-slate-900 dark:text-white">
            {item.productName}
          </h4>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {item.category}
          </p>

        </div>

      </td>

      {/* SKU */}

      <td className="px-6 py-5">

        <span
  className="
    inline-flex
    whitespace-nowrap
    rounded-xl
    bg-slate-100
    dark:bg-slate-800
    px-3
    py-1
    text-sm
    font-medium
    text-slate-700
    dark:text-slate-300
  "
>
          {item.sku}
        </span>

      </td>

      {/* Current Stock */}

      <td className="px-6 py-5 text-center">

        <span
          className={`text-lg font-bold ${
            item.stock === 0
              ? "text-red-500"
              : item.stock <= item.reorderLevel
              ? "text-amber-500"
              : "text-emerald-500"
          }`}
        >
          {item.stock}
        </span>

      </td>

      {/* Reorder Level */}

      <td className="px-6 py-5 text-center">

        <span className="font-medium text-slate-700 dark:text-slate-300">
          {item.reorderLevel}
        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5 whitespace-nowrap">

        <InventoryStatusBadge
          stock={item.stock}
    reorderLevel={item.reorderLevel}
        />

      </td>

      {/* Last Updated */}

      <td className="px-6 py-5">

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {item.lastUpdated}
        </span>

      </td>

      {/* Action */}

      <td className="px-6 py-5 text-right">

        <button
          onClick={() => onUpdate(item)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-orange-200
            dark:border-orange-900/40
            bg-orange-50
            dark:bg-orange-900/10
            px-4
            py-2
            text-sm
            font-semibold
            text-orange-400
            transition-all
            duration-300
            hover:bg-orange-100
            dark:hover:bg-orange-900/20
          "
        >
          <Pencil size={15} />
          Update Stock
        </button>

      </td>

    </tr>
  );
};

export default InventoryRow;