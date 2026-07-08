import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

import Logo from "../assets/pop_logo_color_new2.png";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginApi(form);

      login({
        token: response.data.token,
        user: response.data.user,
      });

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F6F3EC] px-6">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#F6F3EC_60%,#EFE9DD_100%)]" />

      {/* Green Glow */}

      <div
        className="
          absolute
          -left-32
          -top-20
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#174C35]/10
          blur-[120px]
        "
      />

      {/* Gold Glow */}

      <div
        className="
          absolute
          -right-32
          bottom-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#D4B56A]/20
          blur-[140px]
        "
      />

      {/* Login Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          w-full
          max-w-[460px]
          rounded-[32px]
          border
          border-[#174C35]/8
          bg-white
          shadow-[0_25px_70px_rgba(0,0,0,0.08)]
        "
      >

        {/* Top Accent */}

        <div className="h-2 rounded-t-[32px] bg-gradient-to-r from-[#174C35] via-[#D4B56A] to-[#174C35]" />

        {/* Header */}

        <div className="px-10 pt-10 text-center">

          <img
            src={Logo}
            alt="Pop Fresh"
            className="mx-auto h-20 object-contain"
          />

          <h1
            className="mt-8 text-4xl text-[#174C35]"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Welcome Back
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-[#667085]">

            Sign in to continue managing
            orders, inventory and customers.

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 px-10 pb-10"
        >
                      {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium text-[#174C35]">
              Email Address
            </label>

            <div
              className="
                group
                flex
                items-center
                rounded-2xl
                border
                border-[#E6E6E6]
                bg-[#FCFCFA]
                px-5
                transition-all
                duration-300
                focus-within:border-[#174C35]
                focus-within:ring-4
                focus-within:ring-[#174C35]/10
              "
            >

              <Mail
                size={19}
                className="text-[#174C35]/60"
              />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="admin@popfresh.in"
                className="
                  h-14
                  w-full
                  bg-transparent
                  px-4
                  text-[#174C35]
                  placeholder:text-[#98A2B3]
                  outline-none
                "
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium text-[#174C35]">
              Password
            </label>

            <div
              className="
                group
                flex
                items-center
                rounded-2xl
                border
                border-[#E6E6E6]
                bg-[#FCFCFA]
                px-5
                transition-all
                duration-300
                focus-within:border-[#174C35]
                focus-within:ring-4
                focus-within:ring-[#174C35]/10
              "
            >

              <Lock
                size={19}
                className="text-[#174C35]/60"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="
                  h-14
                  w-full
                  bg-transparent
                  px-4
                  text-[#174C35]
                  placeholder:text-[#98A2B3]
                  outline-none
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  text-[#667085]
                  transition-colors
                  duration-300
                  hover:text-[#174C35]
                "
              >

                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-3 text-sm text-[#667085]">

              <input
                type="checkbox"
                className="
                  h-4
                  w-4
                  rounded
                  accent-[#174C35]
                "
              />

              Remember Me

            </label>
<button
  type="button"
  onClick={() => navigate("/forgot-password")}
  className="
    text-sm
    font-medium
    text-[#174C35]
    transition
    hover:text-[#D4B56A]
  "
>

  Forgot Password?

</button>

          </div>

          {/* Login Button */}

          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            disabled={loading}
            className="
              h-14
              w-full
              rounded-full
              bg-[#174C35]
              text-white
              font-semibold
              tracking-wide
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#123A29]
              hover:shadow-[0_15px_35px_rgba(23,76,53,0.28)]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </motion.button>
                    {/* Footer */}

          <div className="pt-2">

            <div className="my-8 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#E8E8E8]" />

              <span className="text-xs font-medium tracking-[0.25em] text-[#98A2B3]">
                POP FRESH
              </span>

              <div className="h-px flex-1 bg-[#E8E8E8]" />

            </div>

            <div className="space-y-2 text-center">

              <p
                className="text-[15px] text-[#174C35]"
                style={{
                  fontFamily: "Fraunces, serif",
                }}
              >
                Healthy Snacking.
              </p>

              <p className="text-xs font-medium tracking-[0.18em] text-[#D4B56A] uppercase">
                Bold Flavours • Perfect Crunch
              </p>

            </div>

            <p className="mt-8 text-center text-xs leading-6 text-[#98A2B3]">
              Secure access to the
              <span className="font-semibold text-[#174C35]">
                {" "}Pop Fresh Admin Suite
              </span>
            </p>

            <p className="mt-2 text-center text-[11px] text-[#B4B4B4]">
              © {new Date().getFullYear()} Pop Fresh.
              All Rights Reserved.
            </p>

          </div>

        </form>

      </motion.div>

    </div>
  );
}



// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   Sparkles,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { login as loginApi } from "../api/auth.api";
// import { useAuth } from "../context/AuthContext";

// import Logo from "../assets/pop_logo_color_new2.png";

// export default function Login() {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await loginApi(form);

//       login({
//         token: response.data.token,
//         user: response.data.user,
//       });

//       navigate("/");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           "Unable to login. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#F6F3EC]">

//       {/* Background */}

//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#648D67_0%,#086B46_45%,#032F23_100%)]" />

//       {/* Glow */}

//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

//       {/* Golden Particles */}

//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full bg-[#D4B56A]"
//           style={{
//             width: i % 2 ? 4 : 6,
//             height: i % 2 ? 4 : 6,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             opacity: [0.3, 1, 0.3],
//             y: [0, -12, 0],
//           }}
//           transition={{
//             duration: 4 + i * 0.2,
//             repeat: Infinity,
//           }}
//         />
//       ))}

//       <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

//         {/* LEFT SIDE */}

//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="
//             hidden
//             lg:flex
//             flex-col
//             justify-center
//             px-24
//             text-white
//           "
//         >

//           <div className="inline-flex items-center gap-2 w-fit rounded-full border border-[#D4B56A]/40 px-5 py-3 text-[#E6C06A] tracking-[0.2em] text-xs">

//             <Sparkles size={14} />

//             POP FRESH ADMIN

//           </div>

//           <h1
//             className="mt-8 text-6xl leading-[0.95]"
//             style={{
//               fontFamily: "Fraunces, serif",
//             }}
//           >
//             Welcome
//             <br />
//             Back.
//           </h1>

//           <p className="mt-8 max-w-lg text-lg leading-9 text-white/80">

//             Manage orders, customers, inventory,
//             shipments and everything that powers
//             Pop Fresh — all from one beautifully
//             crafted dashboard.

//           </p>

//           <div className="mt-16 flex gap-12">

//             <div>
//               <h2 className="text-4xl font-bold text-[#D4B56A]">
//                 100%
//               </h2>

//               <p className="mt-2 text-white/70">
//                 Premium Experience
//               </p>
//             </div>

//             <div>
//               <h2 className="text-4xl font-bold text-[#D4B56A]">
//                 Fast
//               </h2>

//               <p className="mt-2 text-white/70">
//                 Order Processing
//               </p>
//             </div>

//           </div>

//         </motion.div>

//         {/* RIGHT SIDE */}

//         <div className="flex items-center justify-center px-6 py-12">

//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 50,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.8,
//             }}
//             className="
//               w-full
//               max-w-md
//               rounded-[32px]
//               border
//               border-white/20
//               bg-white/10
//               backdrop-blur-2xl
//               shadow-[0_25px_80px_rgba(0,0,0,0.25)]
//             "
//           >

//             {/* Header */}

//             <div className="px-10 pt-10 text-center">

//               <img
//                 src={Logo}
//                 alt="Pop Fresh"
//                 className="mx-auto h-20 object-contain"
//               />

//               <h2
//                 className="mt-6 text-4xl text-white"
//                 style={{
//                   fontFamily: "Fraunces, serif",
//                 }}
//               >
//                 Sign In
//               </h2>

//               <p className="mt-3 text-white/70 leading-7">

//                 Continue to your Pop Fresh
//                 Admin Dashboard.

//               </p>

//             </div>

//             {/* FORM */}

//             <form
//               onSubmit={handleSubmit}
//               className="mt-10 space-y-6 px-10 pb-10"
//             >
//                       {/* Email */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium tracking-wide text-white/80">
//                   Email Address
//                 </label>

//                 <div
//                   className="
//                     group
//                     flex
//                     items-center
//                     rounded-2xl
//                     border
//                     border-white/15
//                     bg-white/10
//                     px-5
//                     transition-all
//                     duration-300
//                     focus-within:border-[#D4B56A]
//                     focus-within:bg-white/15
//                     focus-within:shadow-[0_0_30px_rgba(212,181,106,0.15)]
//                   "
//                 >

//                   <Mail
//                     size={20}
//                     className="text-[#D4B56A]"
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="admin@popfresh.in"
//                     className="
//                       h-14
//                       w-full
//                       bg-transparent
//                       px-4
//                       text-white
//                       placeholder:text-white/40
//                       outline-none
//                     "
//                   />

//                 </div>

//               </div>

//               {/* Password */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium tracking-wide text-white/80">
//                   Password
//                 </label>

//                 <div
//                   className="
//                     group
//                     flex
//                     items-center
//                     rounded-2xl
//                     border
//                     border-white/15
//                     bg-white/10
//                     px-5
//                     transition-all
//                     duration-300
//                     focus-within:border-[#D4B56A]
//                     focus-within:bg-white/15
//                     focus-within:shadow-[0_0_30px_rgba(212,181,106,0.15)]
//                   "
//                 >

//                   <Lock
//                     size={20}
//                     className="text-[#D4B56A]"
//                   />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     required
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="
//                       h-14
//                       w-full
//                       bg-transparent
//                       px-4
//                       text-white
//                       placeholder:text-white/40
//                       outline-none
//                     "
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     className="
//                       text-white/60
//                       transition
//                       hover:text-[#D4B56A]
//                     "
//                   >
//                     {showPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>

//                 </div>

//               </div>

//               {/* Options */}

//               <div className="flex items-center justify-between">

//                 <label className="flex items-center gap-3 text-sm text-white/70">

//                   <input
//                     type="checkbox"
//                     className="
//                       h-4
//                       w-4
//                       rounded
//                       accent-[#D4B56A]
//                     "
//                   />

//                   Remember Me

//                 </label>

//                 <button
//                   type="button"
//                   className="
//                     text-sm
//                     text-[#D4B56A]
//                     transition
//                     hover:text-white
//                   "
//                 >
//                   Forgot Password?
//                 </button>

//               </div>

//               {/* Login Button */}

//               <motion.button
//                 whileHover={{
//                   scale: 1.02,
//                 }}
//                 whileTap={{
//                   scale: 0.98,
//                 }}
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   h-14
//                   w-full
//                   rounded-full
//                   bg-[#D4B56A]
//                   text-[#174C35]
//                   font-semibold
//                   tracking-wide
//                   shadow-xl
//                   transition-all
//                   duration-300
//                   hover:shadow-[0_15px_40px_rgba(212,181,106,0.45)]
//                   disabled:cursor-not-allowed
//                   disabled:opacity-70
//                 "
//               >

//                 {loading
//                   ? "Signing In..."
//                   : "LOGIN TO DASHBOARD"}

//               </motion.button>

//               {/* Divider */}

//               <div className="flex items-center gap-4 py-2">

//                 <div className="h-px flex-1 bg-white/10" />

//                 <span className="text-xs tracking-[0.25em] text-white/40">

//                   POP FRESH

//                 </span>

//                 <div className="h-px flex-1 bg-white/10" />

//               </div>

//                             {/* Footer */}

//               <div className="pt-2 text-center">

//                 <p
//                   className="text-white/80 text-sm"
//                   style={{
//                     fontFamily: "Fraunces, serif",
//                   }}
//                 >
//                   Healthy Snacking.
//                 </p>

//                 <p
//                   className="mt-1 text-[#D4B56A] text-sm tracking-[0.18em]"
//                 >
//                   BOLD FLAVOURS • PERFECT CRUNCH
//                 </p>

//                 <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//                 <div className="mt-6 flex items-center justify-center gap-3">

//                   <div className="h-2 w-2 rounded-full bg-[#D4B56A]" />

//                   <span className="text-xs tracking-[0.25em] text-white/50">
//                     POP FRESH ADMIN SUITE
//                   </span>

//                   <div className="h-2 w-2 rounded-full bg-[#D4B56A]" />

//                 </div>

//                 <p className="mt-4 text-xs leading-6 text-white/45">

//                   Built with ❤️ for seamless order management,
//                   inventory tracking and customer experience.

//                 </p>

//                 <p className="mt-8 text-[11px] tracking-wide text-white/30">

//                   © {new Date().getFullYear()} Pop Fresh.
//                   All Rights Reserved.

//                 </p>

//               </div>

//             </form>

//           </motion.div>

//         </div>

//       </div>

//     </div>
//   );
// }


// import { useState } from "react";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { login as loginApi } from "../api/auth.api";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await loginApi(form);

//       login({
//         token: response.data.token,
//         user: response.data.user,
//       });

//       navigate("/");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           "Unable to login. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8F3] px-4">
//       {/* Background Blur */}
//       <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-200 blur-3xl opacity-40" />
//       <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-yellow-200 blur-3xl opacity-30" />

//       {/* Login Card */}
//       <div className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl">
//         {/* Header */}

//         <div className="px-10 pt-10 text-center">
//           <img
//             src="/logo.png"
//             alt="PopFresh"
//             className="mx-auto h-16 object-contain"
//           />

//           <h1 className="mt-6 text-3xl font-bold text-gray-900">
//             Welcome Back
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Login to access your PopFresh Admin Dashboard
//           </p>
//         </div>

//         {/* Form */}

//         <form
//           onSubmit={handleSubmit}
//           className="mt-8 space-y-6 px-10 pb-10"
//         >
//           {/* Email */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Email
//             </label>

//             <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4">
//               <Mail className="h-5 w-5 text-gray-400" />

//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="admin@popfresh.in"
//                 className="h-12 w-full bg-transparent px-3 outline-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Password
//             </label>

//             <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4">
//               <Lock className="h-5 w-5 text-gray-400" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="h-12 w-full bg-transparent px-3 outline-none"
//                 required
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}

//           <button
//             type="submit"
//             disabled={loading}
//             className="h-12 w-full rounded-xl bg-[#3D8D3A] font-semibold text-white transition-all duration-300 hover:bg-[#2F6E2D] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {loading ? "Signing In..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }