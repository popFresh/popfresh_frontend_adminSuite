import { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { forgotPassword } from "../api/auth.api.js";

import Logo from "../assets/pop_logo_color_new2.png";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [emailSent, setEmailSent] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
  });

  // ==============================================
  // INPUT CHANGE
  // ==============================================

  const handleChange = (e) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  // ==============================================
  // SUBMIT
  // ==============================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await forgotPassword(form.email);

      toast.success(response.message);

      setEmailSent(true);

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to send reset link."

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

      {/* Accent */}

      <div className="h-2 rounded-t-[32px] bg-gradient-to-r from-[#174C35] via-[#D4B56A] to-[#174C35]" />

      {/* Header */}

      <div className="px-10 pt-10 text-center">

        <img
          src={Logo}
          alt="PopFresh"
          className="mx-auto h-20 object-contain"
        />

        <h1
          className="mt-8 text-4xl text-[#174C35]"
          style={{
            fontFamily: "Fraunces, serif",
          }}
        >
          Forgot Your Password?
        </h1>

        <p className="mt-3 text-[15px] leading-7 text-[#667085]">

          Enter your registered email address and
          we'll send you a secure password reset link.

        </p>

      </div>

      {!emailSent ? (

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

          {/* Button */}

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
              ? "Sending..."
              : "Send Reset Link"}

          </motion.button>
                    {/* Back to Login */}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              text-[#174C35]
              transition
              hover:text-[#D4B56A]
            "
          >

            <ArrowLeft size={17} />

            Back to Login

          </button>

        </form>

      ) : (

        <div className="px-10 pb-10 pt-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#174C35]/10">

            <Mail
              size={36}
              className="text-[#174C35]"
            />

          </div>

          <h2
            className="mt-8 text-3xl text-[#174C35]"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Check Your Email
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-[#667085]">

            If an account exists with

            <span className="font-semibold text-[#174C35]">
              {" "}{form.email}
            </span>

            , we've sent a secure password reset link.

          </p>

          <p className="mt-3 text-sm text-[#98A2B3]">

            The reset link will expire in

            <span className="font-semibold text-[#174C35]">
              {" "}30 minutes
            </span>.

          </p>

          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => navigate("/login")}
            className="
              mt-10
              h-14
              w-full
              rounded-full
              bg-[#174C35]
              font-semibold
              tracking-wide
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#123A29]
              hover:shadow-[0_15px_35px_rgba(23,76,53,0.28)]
            "
          >

            Back To Login

          </motion.button>

        </div>

      )}

      {/* Footer */}

      <div className="px-10 pb-10">

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

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D4B56A]">

            Bold Flavours • Perfect Crunch

          </p>

        </div>

        <p className="mt-8 text-center text-xs leading-6 text-[#98A2B3]">

          Secure access to the

          <span className="font-semibold text-[#174C35]">

            {" "}PopFresh Admin Suite

          </span>

        </p>

        <p className="mt-2 text-center text-[11px] text-[#B4B4B4]">

          © {new Date().getFullYear()} Pop Fresh.

          All Rights Reserved.

        </p>

      </div>

    </motion.div>

  </div>
);
}