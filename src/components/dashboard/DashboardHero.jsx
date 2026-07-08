import { RefreshCw } from "lucide-react";

const DashboardHero = ({
  adminName = "Admin",
  pendingActions = 0,
  lowStockProducts = 0,
  onRefresh,
  loading,
}) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-[#E6E0D5]
        dark:border-[#2A3933]
        bg-white
        dark:bg-[#1A2420]
        px-8
        py-10
        lg:px-12
        lg:py-12
        mb-8
      "
    >
      {/* Left Glow */}
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-52
          bg-[#D6B86B]
          opacity-10
          blur-3xl
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-52
          bg-[#A8C89A]
          opacity-10
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <div>
        <p
          className="
            uppercase
            tracking-[4px]
            text-xs
            font-medium
            text-slate-500
            dark:text-[#A8B3AC]
          "
        >
          ✦ {formattedDate}
        </p>
      
        <h1
          className="
            mt-5
            text-4xl
            lg:text-6xl
            font-bold
            leading-tight
            text-[#0F172A]
            dark:text-[#F3F4F1]
          "
        >
          {greeting},{" "}
          <span className="gradient-text">
            {adminName}
          </span>{" "}
          👋
        </h1>

        <p
          className="
            mt-5
            max-w-3xl
            text-lg
            text-slate-500
            dark:text-[#A8B3AC]
            leading-relaxed
          "
        >
          Here's what's happening at{" "}
          <span className="font-semibold text-[#A67C52]">
            POPFRESH
          </span>{" "}
          today. You have{" "}
          <span className="font-semibold text-[#A67C52]">
            {pendingActions} pending action
            {pendingActions !== 1 ? "s" : ""}
          </span>{" "}
          requiring your attention and{" "}
          <span className="font-semibold text-[#A67C52]">
            {lowStockProducts} low-stock product
            {lowStockProducts !== 1 ? "s" : ""}
          </span>
          .
        </p>

      </div>
        <div className="flex justify-start lg:justify-end">
  <button
    onClick={onRefresh}
    disabled={loading}
    className="
      inline-flex
      items-center
      gap-2
      rounded-2xl
      border
      border-[#E6E0D5]
      dark:border-[#31403B]
      bg-white
      dark:bg-[#24322D]
      px-5
      py-3
      text-sm
      font-medium
      text-[#032F23]
      dark:text-white
      transition-all
      hover:shadow-md
      disabled:opacity-60
      disabled:cursor-not-allowed
    "
  >
    <RefreshCw
      size={18}
      className={loading ? "animate-spin" : ""}
    />

    {loading ? "Refreshing..." : "Refresh"}
  </button>
</div>
      </div>
    </div>
  );
};

export default DashboardHero;

// const DashboardHero = () => {
//   const hour = new Date().getHours();

//   let greeting = "Good Evening";

//   if (hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour < 17) {
//     greeting = "Good Afternoon";
//   }

//   const today = new Date();

//   const formattedDate = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <div
//       className="
//       relative
//       overflow-hidden
//       rounded-[32px]
//       border
//       border-[#E6E0D5]
//       dark:border-[#2A3933]
//       bg-white
//       dark:bg-[#1A2420]
//       px-8
//       py-10
//       lg:px-12
//       lg:py-12
//       mb-8
//       "
//     >
//       {/* Left Glow */}
//       <div
//         className="
//         absolute
//         left-0
//         top-0
//         h-full
//         w-52
//         bg-[#D6B86B]
//         opacity-10
//         blur-3xl
//         "
//       />

//       {/* Right Glow */}
//       <div
//         className="
//         absolute
//         right-0
//         top-0
//         h-full
//         w-52
//         bg-[#A8C89A]
//         opacity-10
//         blur-3xl
//         "
//       />

//       <div className="relative z-10">
//         <p
//           className="
//           uppercase
//           tracking-[4px]
//           text-xs
//           font-medium
//           text-slate-500
//           dark:text-[#A8B3AC]
//           "
//         >
//           ✦ {formattedDate}
//         </p>

//         <h1
//           className="
//           mt-5
//           text-4xl
//           lg:text-6xl
//           font-bold
//           leading-tight
//           text-[#0F172A]
//           dark:text-[#F3F4F1]
//           "
//         >
//           {greeting},{" "}
//         <span className="gradient-text">
//   Mohit
// </span>
//           {" "}
//           👋
//         </h1>

//         <p
//           className="
//           mt-5
//           max-w-3xl
//           text-lg
//           text-slate-500
//           dark:text-[#A8B3AC]
//           "
//         >
//           Here's a quick overview of what's happening at POPFRESH today.
//           18 orders need your attention and 4 products are running low.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DashboardHero;