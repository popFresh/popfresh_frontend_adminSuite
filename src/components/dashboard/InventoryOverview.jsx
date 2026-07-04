import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";

export default function InventoryOverview() {
  return (
    <SectionCard
      className="w-full h-full"
      title="Inventory Overview"
      subtitle="52 SKUs across all variants"
    >
      <div className="mt-4 space-y-6">
        {/* In Stock */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-[#032F23] dark:text-white">
              In Stock
            </span>

            <span className="font-semibold text-[#032F23] dark:text-white">
              38 / 52
            </span>
          </div>

          <ProgressBar
            value={75}
            color="bg-green-500"
          />
        </div>

        {/* Low Stock */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-[#032F23] dark:text-white">
              Low Stock
            </span>

            <span className="font-semibold text-[#032F23] dark:text-white">
              9 / 52
            </span>
          </div>

          <ProgressBar
            value={35}
            color="bg-yellow-500"
          />
        </div>

        {/* Out Of Stock */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-[#032F23] dark:text-white">
              Out Of Stock
            </span>

            <span className="font-semibold text-[#032F23] dark:text-white">
              5 / 52
            </span>
          </div>

          <ProgressBar
            value={15}
            color="bg-red-500"
          />
        </div>
      </div>
    </SectionCard>
  );
}