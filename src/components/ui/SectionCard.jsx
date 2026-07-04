import Card from "./Card";

const SectionCard = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#032F23] dark:text-[#F3F4F1]">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-slate-500 dark:text-[#A8B3AC]">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </Card>
  );
};

export default SectionCard;