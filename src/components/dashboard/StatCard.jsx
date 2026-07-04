import Card from "../ui/Card";

const StatCard = ({
  title,
  value,
  growth,
  subtitle,
  icon: Icon,
}) => {
  return (
    <Card className="min-h-[150px]">
      <div className="flex items-start justify-between">
        <p
          className="
          text-sm
          uppercase
          tracking-wide
          text-slate-500
          dark:text-[#A8B3AC]
          "
        >
          {title}
        </p>

        <div
          className="
          h-12
          w-12
          rounded-2xl
          bg-[#F4EFE4]
          dark:bg-[#24322D]
          flex
          items-center
          justify-center
          "
        >
          <Icon
            size={22}
            className="
            text-[#5B665C]
            dark:text-[#A8C89A]
            "
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <h3
            className="
            text-3xl
            font-bold
            text-[#0F172A]
            dark:text-[#F3F4F1]
            "
          >
            {value}
          </h3>

          {growth && (
            <span
              className="
              px-3
              py-1
              rounded-full
              bg-green-100
              text-green-700
              dark:bg-[#1D3B2C]
              dark:text-[#7EE2A8]
              text-sm
              font-medium
              "
            >
              ↗ {growth}
            </span>
          )}
        </div>

        <p
          className="
          mt-3
          text-base
          text-slate-500
          dark:text-[#A8B3AC]
          "
        >
          {subtitle}
        </p>
      </div>
    </Card>
  );
};

export default StatCard;