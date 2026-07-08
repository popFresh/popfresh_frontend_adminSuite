import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import {
  validateInvitation,
  completeInvitation,
} from "../api/auth.api";

import Logo from "../assets/pop_logo_color_new2.png";

export default function InviteSignup() {

  const navigate = useNavigate();

  const { token } = useParams();

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [invitation, setInvitation] =
    useState(null);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({

    password: "",

    confirmPassword: "",

  });

  // ==============================================
  // LOAD INVITATION
  // ==============================================

  useEffect(() => {

    fetchInvitation();

  }, []);

  const fetchInvitation = async () => {

    try {

      setLoading(true);

      const response =
        await validateInvitation(token);

      setInvitation(response.data);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Invalid invitation."

      );

    } finally {

      setLoading(false);

    }

  };

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

    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error("Passwords do not match.");

      return;

    }

    try {

      setSubmitting(true);

      const response =
        await completeInvitation(
          token,
          form
        );

      toast.success(response.message);

      navigate("/login");

    } catch (err) {

      toast.error(
  err.response?.data?.message ||
  "Unable to create account."
);

    } finally {

      setSubmitting(false);

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

      {/* Loading */}

      {loading && (

        <div className="relative z-20 flex flex-col items-center gap-5">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#174C35]/20 border-t-[#174C35]" />

          <p className="text-[#174C35] font-medium">

            Validating Invitation...

          </p>

        </div>

      )}

      {/* Error */}

      {!loading && error && (

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative
            z-20
            w-full
            max-w-md
            rounded-[32px]
            bg-white
            p-10
            shadow-[0_25px_70px_rgba(0,0,0,0.08)]
          "
        >

          <img
            src={Logo}
            alt="PopFresh"
            className="mx-auto h-20"
          />

          <h2
            className="mt-8 text-center text-3xl text-[#174C35]"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Invalid Invitation
          </h2>

          <p className="mt-4 text-center leading-7 text-[#667085]">

            {error}

          </p>

          <button
            onClick={() => navigate("/login")}
            className="
              mt-10
              h-14
              w-full
              rounded-full
              bg-[#174C35]
              font-semibold
              text-white
              transition
              hover:bg-[#123A29]
            "
          >

            Back To Login

          </button>

        </motion.div>

      )}

      {/* Signup Card */}

      {!loading && invitation && (

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
            max-w-[500px]
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
              You're Invited
            </h1>

            <p className="mt-3 text-[15px] leading-7 text-[#667085]">

              Complete your account setup to join the
              PopFresh Admin Portal.

            </p>

          </div>

          {/* Invitation Details */}

          <div className="mt-8 space-y-5 px-10">

            <div className="flex items-center gap-4 rounded-2xl bg-[#F8F8F6] p-4">

              <User
                className="text-[#174C35]"
                size={20}
              />

              <div>

                <p className="text-xs uppercase tracking-wider text-[#98A2B3]">

                  Name

                </p>

                <p className="font-semibold text-[#174C35]">

                  {invitation.name}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-[#F8F8F6] p-4">

              <Mail
                className="text-[#174C35]"
                size={20}
              />

              <div>

                <p className="text-xs uppercase tracking-wider text-[#98A2B3]">

                  Email

                </p>

                <p className="font-semibold text-[#174C35]">

                  {invitation.email}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-[#F8F8F6] p-4">

              <ShieldCheck
                className="text-[#174C35]"
                size={20}
              />

              <div>

                <p className="text-xs uppercase tracking-wider text-[#98A2B3]">

                  Role

                </p>

                <p className="font-semibold text-[#174C35]">

                  {invitation.role}

                </p>

              </div>

            </div>

            {invitation.invitedBy && (

              <div className="rounded-2xl border border-[#D4B56A]/30 bg-[#FFF9ED] p-5">

                <p className="text-sm text-[#8C6A1A]">

                  Invited by

                </p>

                <p className="mt-1 text-lg font-semibold text-[#174C35]">

                  {invitation.invitedBy.name}

                </p>

                <p className="text-sm text-[#667085]">

                  {invitation.invitedBy.email}

                </p>

              </div>

            )}

             </div>
                      {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 px-10 pb-10"
          >

            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#174C35]">
                Create Password
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
                  placeholder="Create a secure password"
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

            {/* Confirm Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-[#174C35]">
                Confirm Password
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

                <Lock
                  size={19}
                  className="text-[#174C35]/60"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
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
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    text-[#667085]
                    transition-colors
                    hover:text-[#174C35]
                  "
                >

                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>

            {/* Submit */}

            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={submitting}
              className="
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
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {submitting
                ? "Creating Account..."
                : "Join PopFresh"}

            </motion.button>

            {/* Footer */}

            <div className="pt-4">

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

                Secure onboarding to the

                <span className="font-semibold text-[#174C35]">

                  {" "}PopFresh Admin Suite

                </span>

              </p>

              <p className="mt-2 text-center text-[11px] text-[#B4B4B4]">

                © {new Date().getFullYear()} Pop Fresh.

                All Rights Reserved.

              </p>

            </div>

          </form>

        </motion.div>

      )}
       </div>
  );
}