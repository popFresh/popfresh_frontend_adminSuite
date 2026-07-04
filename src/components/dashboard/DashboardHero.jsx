const DashboardHero = () => {
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

      <div className="relative z-10">
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
  Mohit
</span>
          {" "}
          👋
        </h1>

        <p
          className="
          mt-5
          max-w-3xl
          text-lg
          text-slate-500
          dark:text-[#A8B3AC]
          "
        >
          Here's a quick overview of what's happening at POPFRESH today.
          18 orders need your attention and 4 products are running low.
        </p>
      </div>
    </div>
  );
};

export default DashboardHero;