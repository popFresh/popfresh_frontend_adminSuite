import { TrendingDown, TrendingUp } from "lucide-react";

import Card from "../ui/Card";

const StatCard = ({
  title,
  value,
  growth = null,
  subtitle,
  icon: Icon,
}) => {
  const growthValue =
    growth !== null && growth !== undefined
      ? Number(growth)
      : null;

  const isPositive = growthValue >= 0;

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
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[#F4EFE4]
            dark:bg-[#24322D]
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

          {growthValue !== null && (
            <span
              className={`
                inline-flex
                items-center
                gap-1
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
                ${
                  isPositive
                    ? "bg-green-100 text-green-700 dark:bg-[#1D3B2C] dark:text-[#7EE2A8]"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }
              `}
            >
              {isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}

              {Math.abs(growthValue)}%
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