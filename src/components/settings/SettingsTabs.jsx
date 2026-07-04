import {
  Settings,
  TicketPercent,
  PlugZap,
  Truck
} from "lucide-react";

const tabs = [
  {
    id: "general",
    label: "General",
    icon: Settings,
  },
  {
    id: "coupons",
    label: "Coupons",
    icon: TicketPercent,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: PlugZap,
  },
];

const SettingsTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className="
        mb-8
        overflow-x-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-sm
        dark:border-slate-800
        dark:bg-[#18211D]
      "
    >
      <div className="flex min-w-max gap-2">

        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                px-5
                py-3
                text-sm
                font-semibold
                transition-all
                duration-300

                ${
                  active
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600 dark:text-slate-300 dark:hover:bg-[#111916]"
                }
              `}
            >
              <Icon size={18} />

              {tab.label}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default SettingsTabs;