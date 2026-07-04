import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialState = {
  name: "",
  role: "",
  email: "",
  phone: "",
  status: "Active",
};

const AddMemberDrawer = ({
  open,
  onClose,
  onSave,
  member = null,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (member) {
      setForm(member);
    } else {
      setForm(initialState);
    }
  }, [member, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.role ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave({
      ...form,
      id: member?.id || Date.now(),
    });

    setForm(initialState);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {member ? "Edit Team Member" : "Add Team Member"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the team member details.
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

        <div className="flex-1 space-y-5 overflow-y-auto p-6">

          {/* Name */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

          </div>

          {/* Role */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            >
              <option value="">Select Role</option>
              <option>Founder & Admin</option>
              <option>Operations Manager</option>
              <option>Warehouse Executive</option>
              <option>Customer Support</option>
              <option>Marketing Executive</option>
              <option>Accounts</option>
            </select>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

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
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              {member ? "Update Member" : "Add Member"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default AddMemberDrawer;