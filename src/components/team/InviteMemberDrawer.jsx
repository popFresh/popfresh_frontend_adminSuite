import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { toast } from "react-toastify";

import { inviteMember } from "../../api/team.api";

const initialState = {
  name: "",
  email: "",
  role: "ADMIN",
};

const InviteMemberDrawer = ({
  open,
  onClose,
  onSuccess,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(initialState);

  // ==============================================
  // RESET FORM
  // ==============================================

  useEffect(() => {

    if (open) {

      setForm(initialState);

    }

  }, [open]);

  if (!open) return null;

  // ==============================================
  // HANDLE INPUT
  // ==============================================

  const handleChange = (e) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));

  };

  // ==============================================
  // INVITE MEMBER
  // ==============================================

  const handleSubmit = async () => {

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.role
    ) {

      toast.error(
        "Please fill all required fields."
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await inviteMember(form);

      toast.success(
        response.message ||
        "Invitation sent successfully."
      );

      setForm(initialState);

      onClose();

      if (onSuccess) {

        onSuccess();

      }

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to send invitation."

      );

    } finally {

      setLoading(false);

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

    <div
      className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-screen
        w-full
        max-w-lg
        flex-col
        bg-white
        dark:bg-[#18211D]
        shadow-2xl
      "
    >

      {/* Header */}

      <div className="border-b border-slate-200 dark:border-slate-800 px-7 py-6">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Invite Team Member

            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">

              Send an invitation to join the
              PopFresh Admin Portal.

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >

            <X size={20} />

          </button>

        </div>

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-7 py-7 space-y-6">

        {/* Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

            Full Name

          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-[#111916]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#174C35]
              focus:ring-4
              focus:ring-[#174C35]/10
            "
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

            Email Address

          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-[#111916]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#174C35]
              focus:ring-4
              focus:ring-[#174C35]/10
            "
          />

        </div>

        {/* Role */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

            Role

          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-[#111916]
              px-4
              py-3
              outline-none
              transition
              focus:border-[#174C35]
              focus:ring-4
              focus:ring-[#174C35]/10
            "
          >

            <option value="ADMIN">
              Administrator
            </option>

            <option
              value="MANAGER"
              disabled
            >
              Manager (Coming Soon)
            </option>

            <option
              value="WAREHOUSE"
              disabled
            >
              Warehouse (Coming Soon)
            </option>

            <option
              value="SUPPORT"
              disabled
            >
              Support (Coming Soon)
            </option>

          </select>

        </div>

        {/* Info */}

        <div
          className="
            rounded-2xl
            border
            border-[#174C35]/10
            bg-[#174C35]/5
            p-5
          "
        >

          <h4 className="font-semibold text-[#174C35]">

            What happens next?

          </h4>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">

            <li>
              • A secure invitation email will be sent.
            </li>

            <li>
              • The invitation expires in 24 hours.
            </li>

            <li>
              • The user sets their own password.
            </li>

            <li>
              • Once accepted, they become an active team member.
            </li>

          </ul>

        </div>
                {/* Footer */}

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                flex-1
                rounded-2xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-[#111916]
                py-3
                font-semibold
                text-slate-700
                dark:text-slate-300
                transition
                hover:bg-slate-50
                dark:hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="
                flex-1
                rounded-2xl
                bg-[#174C35]
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#123A29]
                hover:shadow-[0_12px_30px_rgba(23,76,53,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading
                ? "Sending Invitation..."
                : "Send Invitation"}
            </button>

          </div>

        </div>

      </div>

    </div>
  </>
);

}

export default InviteMemberDrawer;
