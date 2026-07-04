import { useState } from "react";
import {
  Package,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const PackingForm = ({ order, onSave }) => {
  const [packingStation, setPackingStation] = useState("");
  const [notes, setNotes] = useState("");
  const [qualityChecked, setQualityChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...order,
      status: "Packed",
      packing: {
        packingStation,
        notes,
        qualityChecked,
        packedAt: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-full bg-orange-100 p-3">
          <Package
            size={20}
            className="text-orange-600"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Packing Details
          </h3>

          <p className="text-sm text-slate-500">
            Complete the packing process before marking this order as packed.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        {/* Packing Station */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Packing Station
          </label>

          <select
            value={packingStation}
            onChange={(e) =>
              setPackingStation(e.target.value)
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
          >
            <option value="">
              Select Packing Station
            </option>

            <option>Station A</option>
            <option>Station B</option>
            <option>Station C</option>
            <option>Station D</option>
          </select>

        </div>

        {/* Notes */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <ClipboardList size={16} />
            Packing Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Any notes for warehouse or courier..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          />

        </div>

        {/* QC */}

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

          <input
            type="checkbox"
            checked={qualityChecked}
            onChange={(e) =>
              setQualityChecked(e.target.checked)
            }
            className="h-5 w-5 accent-orange-500"
          />

          <div>

            <p className="font-medium text-slate-800">
              Quality Check Completed
            </p>

            <p className="text-sm text-slate-500">
              Packaging, quantity and product quality have been verified.
            </p>

          </div>

        </label>

        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            type="reset"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            <CheckCircle2 size={18} />
            Mark as Packed
          </button>

        </div>

      </form>

    </div>
  );
};

export default PackingForm;