import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  updateProfile,
  changePassword,
} from "../../api/auth.api";

import { useAuth } from "../../context/AuthContext";

const GeneralSettings = () => {
  const { user, updateUser } = useAuth();

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==============================================
  // LOAD USER
  // ==============================================

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "",
    });
  }, [user]);

  // ==============================================
  // PROFILE INPUT
  // ==============================================

  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================================
  // PASSWORD INPUT
  // ==============================================

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================================
  // UPDATE PROFILE
  // ==============================================

  const handleProfileSave = async () => {
    try {
      setSavingProfile(true);

      const response = await updateProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });

      updateUser(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // ==============================================
  // CHANGE PASSWORD
  // ==============================================

  const handlePasswordSave = async () => {
    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      toast.error("Passwords do not match.");

      return;
    }

    try {
      setChangingPassword(true);

      const response = await changePassword(password);

      toast.success(response.message);

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password."
      );
    } finally {
      setChangingPassword(false);
    }
  };
    return (
    <div className="space-y-8">

      {/* ============================================== */}
      {/* MY ACCOUNT */}
      {/* ============================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        {/* Header */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-6 dark:border-slate-800 dark:from-[#1E2A24] dark:to-[#18211D]">

          <div className="flex items-center gap-5">

            {/* Avatar */}

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D6B86B] text-3xl font-bold text-[#111916]">

              {user?.name?.charAt(0).toUpperCase() || "A"}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                My Account

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Manage your administrator profile and security.

              </p>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">

                  {profile.role}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="grid gap-6 p-8 md:grid-cols-2">

          {/* Name */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">

              <User size={16} />

              Full Name

            </label>

            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          {/* Role */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

              Role

            </label>

            <input
              value={profile.role}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 dark:border-slate-700 dark:bg-[#111916] dark:text-slate-400"
            />

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">

              <Mail size={16} />

              Email Address

            </label>

            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">

              <Phone size={16} />

              Phone Number

            </label>

            <input
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 px-8 py-6 dark:border-slate-800">

          <button
            onClick={handleProfileSave}
            disabled={savingProfile}
            className="flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Save size={18} />

            {savingProfile
              ? "Saving..."
              : "Save Profile"}

          </button>

        </div>

      </div>
            {/* ============================================== */}
      {/* CHANGE PASSWORD */}
      {/* ============================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        {/* Header */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 dark:border-slate-800 dark:from-[#1E2A24] dark:to-[#18211D]">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">

              <Lock size={24} />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                Change Password

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Update your account password to keep your dashboard secure.

              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          {/* Current Password */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

              Current Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword.current
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

                New Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword.new
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword.new ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

                Confirm Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword.confirm
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 px-8 py-6 dark:border-slate-800">

          <button
            onClick={handlePasswordSave}
            disabled={changingPassword}
            className="flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Lock size={18} />

            {changingPassword
              ? "Updating..."
              : "Update Password"}

          </button>

        </div>

      </div>
         </div>
  );
};

export default GeneralSettings;

// import { useState } from "react";
// import {
//   User,
//   Building2,
//   Phone,
//   Mail,
//   MapPin,
//   Lock,
//   Save,
// } from "lucide-react";

// import settingsData from "../../data/settingsData";

// const GeneralSettings = () => {
//   const [settings] = useState(settingsData);

//   const [password, setPassword] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });

//   const handlePasswordChange = (e) => {
//     setPassword({
//       ...password,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = () => {
//     console.log("Save Settings");
//   };

//   const handlePasswordSave = () => {
//     console.log(password);
//   };

//   return (
//     <div className="space-y-8">

//       {/* Admin Information */}

//       <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

//         <div className="mb-6 flex items-center gap-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
//             <User size={22} />
//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//               Administrator
//             </h2>

//             <p className="text-sm text-slate-500">
//               Your account information
//             </p>

//           </div>

//         </div>

//         <div className="grid gap-5 md:grid-cols-2">

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Full Name
//             </label>

//             <input
//               value={settings.admin.name}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Role
//             </label>

//             <input
//               value={settings.admin.role}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

//               <Mail size={15} />

//               Email

//             </label>

//             <input
//               value={settings.admin.email}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

//               <Phone size={15} />

//               Phone

//             </label>

//             <input
//               value={settings.admin.phone}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//         </div>

//       </div>

//       {/* Company Information */}

//       <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

//         <div className="mb-6 flex items-center gap-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

//             <Building2 size={22} />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//               Company Information
//             </h2>

//             <p className="text-sm text-slate-500">
//               Business information
//             </p>

//           </div>

//         </div>

//         <div className="grid gap-5 md:grid-cols-2">

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Business Name
//             </label>

//             <input
//               value={settings.company.businessName}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               GST Number
//             </label>

//             <input
//               value={settings.company.gst}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               PAN Number
//             </label>

//             <input
//               value={settings.company.pan}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Website
//             </label>

//             <input
//               value={settings.company.website}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>
//                     <div>

//             <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

//               <Mail size={15} />

//               Support Email

//             </label>

//             <input
//               value={settings.company.supportEmail}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">

//               <Phone size={15} />

//               Support Phone

//             </label>

//             <input
//               value={settings.company.supportPhone}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//         </div>

//       </div>

//       {/* Address */}

//       <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

//         <div className="mb-6 flex items-center gap-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">

//             <MapPin size={22} />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//               Warehouse Address
//             </h2>

//             <p className="text-sm text-slate-500">
//               Primary business location
//             </p>

//           </div>

//         </div>

//         <div className="grid gap-5 md:grid-cols-2">

//           <div className="md:col-span-2">

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Address Line 1
//             </label>

//             <input
//               value={settings.address.line1}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div className="md:col-span-2">

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Address Line 2
//             </label>

//             <input
//               value={settings.address.line2}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               City
//             </label>

//             <input
//               value={settings.address.city}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               State
//             </label>

//             <input
//               value={settings.address.state}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Country
//             </label>

//             <input
//               value={settings.address.country}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Pincode
//             </label>

//             <input
//               value={settings.address.pincode}
//               readOnly
//               className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//         </div>

//       </div>
//             {/* Security */}

//       <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

//         <div className="mb-6 flex items-center gap-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">

//             <Lock size={22} />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//               Security
//             </h2>

//             <p className="text-sm text-slate-500">
//               Change your account password
//             </p>

//           </div>

//         </div>

//         <div className="grid gap-5">

//           <div>

//             <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//               Current Password
//             </label>

//             <input
//               type="password"
//               name="current"
//               value={password.current}
//               onChange={handlePasswordChange}
//               placeholder="••••••••"
//               className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//             />

//           </div>

//           <div className="grid gap-5 md:grid-cols-2">

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//                 New Password
//               </label>

//               <input
//                 type="password"
//                 name="new"
//                 value={password.new}
//                 onChange={handlePasswordChange}
//                 placeholder="••••••••"
//                 className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//               />

//             </div>

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
//                 Confirm Password
//               </label>

//               <input
//                 type="password"
//                 name="confirm"
//                 value={password.confirm}
//                 onChange={handlePasswordChange}
//                 placeholder="••••••••"
//                 className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
//               />

//             </div>

//           </div>

//           <div className="flex justify-end">

//             <button
//               onClick={handlePasswordSave}
//               className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//             >
//               Update Password
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* Save */}

//       <div className="flex justify-end">

//         <button
//           onClick={handleSave}
//           className="
//             flex
//             items-center
//             gap-2
//             rounded-2xl
//             bg-orange-500
//             px-7
//             py-3
//             font-semibold
//             text-white
//             transition
//             hover:bg-orange-600
//           "
//         >
//           <Save size={18} />

//           Save Changes

//         </button>

//       </div>

//     </div>
//   );
// };

// export default GeneralSettings;