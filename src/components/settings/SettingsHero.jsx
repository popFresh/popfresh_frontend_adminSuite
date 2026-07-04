import { Settings, ShieldCheck } from "lucide-react";

const SettingsHero = () => {
  return (
    <section
      className="
        mb-8
        overflow-hidden
        rounded-3xl
        
bg-gradient-to-r
from-[#FFF5E8]
via-[#F4F9EA]
to-[#FDFBF7]

border
border-[#E8E6DF]

dark:from-[#18211D]
dark:via-[#116240]
dark:to-[#22302A]
dark:border-[#2B3933]
        p-8
        text-slate-900 dark:text-white
        shadow-lg
      "
    >
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        {/* Left */}

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">

            <ShieldCheck size={16} />

            Admin Settings

          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Manage your administrator account, company information,
            discount coupons, security preferences and third-party
            integrations from one place.
          </p>

        </div>

        {/* Right */}

        <div className="hidden lg:flex">

          <div
            className="
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-3xl
              bg-white/15
              backdrop-blur
            "
          >
            <Settings size={54} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default SettingsHero;