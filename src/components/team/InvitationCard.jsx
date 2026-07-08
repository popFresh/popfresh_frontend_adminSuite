import {
  Mail,
  CalendarDays,
  Clock3,
  RefreshCcw,
  Trash2,
} from "lucide-react";

const InvitationCard = ({
  invitation,
  onResend,
  onCancel,
  resendLoading,
  cancelLoading,
}) => {

  const initials = invitation.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const invitedDate = new Date(
    invitation.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const expiryDate = new Date(
    invitation.expiresAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="
        rounded-3xl
        border
        border-amber-200
        dark:border-amber-900/30
        bg-white
        dark:bg-[#18211D]
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          {/* Avatar */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-amber-100
              dark:bg-amber-900/20
              text-lg
              font-bold
              text-amber-700
              dark:text-amber-300
            "
          >
            {initials}
          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">

              {invitation.name}

            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              {invitation.role}

            </p>

          </div>

        </div>

        <span
          className="
            rounded-full
            bg-amber-100
            px-3
            py-1
            text-xs
            font-semibold
            text-amber-700
            dark:bg-amber-900/20
            dark:text-amber-300
          "
        >
          Pending
        </span>

      </div>

      {/* Divider */}

      <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

      {/* Details */}

      <div className="space-y-4">

        {/* Email */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">

            <Mail
              size={16}
              className="text-slate-600 dark:text-slate-300"
            />

          </div>

          <span className="text-sm text-slate-600 dark:text-slate-300">

            {invitation.email}

          </span>

        </div>

        {/* Invited */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">

            <CalendarDays
              size={16}
              className="text-slate-600 dark:text-slate-300"
            />

          </div>

          <span className="text-sm text-slate-600 dark:text-slate-300">

            Invited {invitedDate}

          </span>

        </div>

        {/* Expires */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">

            <Clock3
              size={16}
              className="text-slate-600 dark:text-slate-300"
            />

          </div>

          <span className="text-sm text-slate-600 dark:text-slate-300">

            Expires {expiryDate}

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-7 grid grid-cols-2 gap-3">

        <button
  onClick={() => onResend(invitation)}
  disabled={resendLoading}
  className="
    flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-[#174C35]/20
    bg-[#174C35]/5
    py-3
    text-sm
    font-semibold
    text-[#174C35]
    transition
    hover:bg-[#174C35]/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  <RefreshCcw
    size={16}
    className={resendLoading ? "animate-spin" : ""}
  />

  {resendLoading
    ? "Sending..."
    : "Resend"}

</button>

        <button
          onClick={() => onCancel(invitation)}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            py-3
            text-sm
            font-semibold
            text-red-600
            transition
            hover:bg-red-100
            dark:border-red-900/40
            dark:bg-red-900/10
            dark:text-red-400
            dark:hover:bg-red-900/20
          "
        >
          <Trash2 size={16} />
{cancelLoading
 ? "Cancelling..."
 : "Cancel"}

        </button>

      </div>

    </div>
  );
};

export default InvitationCard;