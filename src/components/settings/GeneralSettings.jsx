import { useState } from "react";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Lock,
  Save,
} from "lucide-react";

import settingsData from "../../data/settingsData";

const GeneralSettings = () => {
  const [settings] = useState(settingsData);

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Save Settings");
  };

  const handlePasswordSave = () => {
    console.log(password);
  };

  return (
    <div className="space-y-8">

      {/* Admin Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <User size={22} />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Administrator
            </h2>

            <p className="text-sm text-slate-500">
              Your account information
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Full Name
            </label>

            <input
              value={settings.admin.name}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Role
            </label>

            <input
              value={settings.admin.role}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

              <Mail size={15} />

              Email

            </label>

            <input
              value={settings.admin.email}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

              <Phone size={15} />

              Phone

            </label>

            <input
              value={settings.admin.phone}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

        </div>

      </div>

      {/* Company Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

            <Building2 size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Company Information
            </h2>

            <p className="text-sm text-slate-500">
              Business information
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Business Name
            </label>

            <input
              value={settings.company.businessName}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              GST Number
            </label>

            <input
              value={settings.company.gst}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              PAN Number
            </label>

            <input
              value={settings.company.pan}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Website
            </label>

            <input
              value={settings.company.website}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>
                    <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

              <Mail size={15} />

              Support Email

            </label>

            <input
              value={settings.company.supportEmail}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

              <Phone size={15} />

              Support Phone

            </label>

            <input
              value={settings.company.supportPhone}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

        </div>

      </div>

      {/* Address */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">

            <MapPin size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Warehouse Address
            </h2>

            <p className="text-sm text-slate-500">
              Primary business location
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Address Line 1
            </label>

            <input
              value={settings.address.line1}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Address Line 2
            </label>

            <input
              value={settings.address.line2}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              City
            </label>

            <input
              value={settings.address.city}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              State
            </label>

            <input
              value={settings.address.state}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Country
            </label>

            <input
              value={settings.address.country}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Pincode
            </label>

            <input
              value={settings.address.pincode}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

        </div>

      </div>
            {/* Security */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">

            <Lock size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Security
            </h2>

            <p className="text-sm text-slate-500">
              Change your account password
            </p>

          </div>

        </div>

        <div className="grid gap-5">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Current Password
            </label>

            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                New Password
              </label>

              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

          </div>

          <div className="flex justify-end">

            <button
              onClick={handlePasswordSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Update Password
            </button>

          </div>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-7
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >
          <Save size={18} />

          Save Changes

        </button>

      </div>

    </div>
  );
};

export default GeneralSettings;