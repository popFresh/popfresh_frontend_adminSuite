import {
  Mail,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";

const TeamCard = ({
  member,
  onEdit,
  onDelete,
}) => {
  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div 
    className="
rounded-3xl
border
border-slate-200
dark:border-slate-800
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

          <div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-orange-100
dark:bg-orange-900/20
text-lg
font-bold
text-orange-500
dark:text-orange-300
">
            {initials}
          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {member.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {member.role}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            member.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {member.status}
        </span>

      </div>

      {/* Divider */}

      <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

      {/* Contact */}

      <div className="space-y-4">

        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">

          <div className="rounded-lg bg-slate-100 dark:text-slate-600 dark:bg-slate-300 p-2">
            <Mail size={16} />
          </div>

          <span>{member.email}</span>

        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-slate-300 p-2">
            <Phone size={16} />
          </div>

          <span>{member.phone}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit(member)}
          className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-[#18211D]
py-3
text-sm
font-semibold
text-slate-700
dark:text-white
transition
hover:border-orange-300
hover:bg-orange-50
dark:hover:bg-[#111916]
hover:text-orange-600
"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(member)}
         className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
border
border-red-200
dark:border-red-900/40
bg-red-50
dark:bg-red-900/10
py-3
text-sm
font-semibold
text-red-400
transition
hover:bg-red-100
dark:hover:bg-red-900/20
"
        >
          <Trash2 size={16} />
          Remove
        </button>

      </div>

    </div>
  );
};

export default TeamCard;