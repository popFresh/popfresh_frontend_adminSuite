import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";

export default function InventoryOverview({
  data = {},
}) {
  const {
    totalProducts = 0,
    healthyProducts = 0,
    lowStockProducts = 0,
    outOfStockProducts = 0,
  } = data;

  const healthyPercentage =
    totalProducts === 0
      ? 0
      : Math.round((healthyProducts / totalProducts) * 100);

  const lowStockPercentage =
    totalProducts === 0
      ? 0
      : Math.round((lowStockProducts / totalProducts) * 100);

  const outOfStockPercentage =
    totalProducts === 0
      ? 0
      : Math.round((outOfStockProducts / totalProducts) * 100);

  return (
    <SectionCard
      className="w-full h-full"
      title="Inventory Overview"
      subtitle={`${totalProducts} SKU${totalProducts !== 1 ? "s" : ""} across all products`}
    >
      <div className="mt-4 space-y-6">
        {/* Healthy Stock */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-[#032F23] dark:text-white">
              In Stock
            </span>

            <span className="font-semibold text-[#032F23] dark:text-white">
              {healthyProducts} / {totalProducts}
            </span>
          </div>

          <ProgressBar
            value={healthyPercentage}
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
              {lowStockProducts} / {totalProducts}
            </span>
          </div>

          <ProgressBar
            value={lowStockPercentage}
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
              {outOfStockProducts} / {totalProducts}
            </span>
          </div>

          <ProgressBar
            value={outOfStockPercentage}
            color="bg-red-500"
          />
        </div>
      </div>
    </SectionCard>
  );
}

// import SectionCard from "../ui/SectionCard";
// import ProgressBar from "../ui/ProgressBar";

// export default function InventoryOverview() {
//   return (
//     <SectionCard
//       className="w-full h-full"
//       title="Inventory Overview"
//       subtitle="52 SKUs across all variants"
//     >
//       <div className="mt-4 space-y-6">
//         {/* In Stock */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <span className="font-medium text-[#032F23] dark:text-white">
//               In Stock
//             </span>

//             <span className="font-semibold text-[#032F23] dark:text-white">
//               38 / 52
//             </span>
//           </div>

//           <ProgressBar
//             value={75}
//             color="bg-green-500"
//           />
//         </div>

//         {/* Low Stock */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <span className="font-medium text-[#032F23] dark:text-white">
//               Low Stock
//             </span>

//             <span className="font-semibold text-[#032F23] dark:text-white">
//               9 / 52
//             </span>
//           </div>

//           <ProgressBar
//             value={35}
//             color="bg-yellow-500"
//           />
//         </div>

//         {/* Out Of Stock */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <span className="font-medium text-[#032F23] dark:text-white">
//               Out Of Stock
//             </span>

//             <span className="font-semibold text-[#032F23] dark:text-white">
//               5 / 52
//             </span>
//           </div>

//           <ProgressBar
//             value={15}
//             color="bg-red-500"
//           />
//         </div>
//       </div>
//     </SectionCard>
//   );
// }