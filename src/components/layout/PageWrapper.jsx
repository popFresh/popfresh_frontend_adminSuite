const PageWrapper = ({ title, subtitle }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#032F23] dark:text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;