import { useEffect, useState } from "react";
import { X } from "lucide-react";

const UpdateInventoryDrawer = ({
  open,
  item,
  onClose,
  onSave,
}) => {
  const [adjustment, setAdjustment] = useState("Add");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("Manual Update");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setAdjustment("Add");
      setQuantity("");
      setReason("Manual Update");
      setNotes("");
    }
  }, [open, item]);

  if (!open || !item) return null;

  const qty = Number(quantity) || 0;

  const updatedStock =
    adjustment === "Add"
      ? item.stock + qty
      : Math.max(0, item.stock - qty);

  const handleSave = async () => {
  if (!qty || qty <= 0) {
    toast.error("Please enter a valid quantity.");
    return;
  }

  let status = "Healthy";

  if (updatedStock === 0) {
    status = "Out of Stock";
  } else if (updatedStock <= item.reorderLevel) {
    status = "Low Stock";
  }

  try {
    setSaving(true);

    await onSave({
      ...item,
      stock: updatedStock,
      status,
      lastUpdated: new Date().toLocaleString(),
      adjustment,
      reason,
      notes,
    });

    onClose();

  } finally {
    setSaving(false);
  }
};
  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Update Inventory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {item.productName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Current Stock */}

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">

            <p className="text-sm text-slate-500">
              Current Stock
            </p>

            <h2 className="mt-2 text-4xl font-bold text-orange-600">
              {item.stock}
            </h2>

          </div>

          {/* Adjustment */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Adjustment
            </label>

            <select
              value={adjustment}
              onChange={(e) =>
                setAdjustment(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option>Add</option>
              <option>Remove</option>
            </select>

          </div>

          {/* Quantity */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />

          </div>

          {/* Reason */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <select
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option>Manual Update</option>
              <option>Production</option>
              <option>Damaged Goods</option>
              <option>Customer Return</option>
              <option>Stock Audit</option>
            </select>

          </div>

          {/* Notes */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Optional notes..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />

          </div>

          {/* Preview */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <p className="text-sm text-slate-500">
              Updated Stock
            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${
                adjustment === "Add"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {updatedStock}
            </h2>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-slate-50 p-5">

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
  onClick={handleSave}
  disabled={saving}
  className="
    flex-1
    rounded-xl
    bg-orange-500
    py-3
    font-medium
    text-white
    transition
    hover:bg-orange-600
    disabled:cursor-not-allowed
    disabled:opacity-70
  "
>
  {saving ? (
    <span className="flex items-center justify-center gap-2">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      Updating...
    </span>
  ) : (
    "Update Inventory"
  )}
</button>

          </div>

        </div>

      </div>
    </>
  );
};

export default UpdateInventoryDrawer;