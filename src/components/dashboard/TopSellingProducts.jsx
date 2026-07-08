import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";

export default function TopSellingProducts({
  data = [],
}) {
  const maxSold =
    data.length > 0
      ? Math.max(...data.map((item) => item.sold))
      : 1;

  return (
    <SectionCard
      className="w-full h-full"
      title="Top Selling Products"
      subtitle="This month's bestsellers"
    >
      {data.length === 0 ? (
        <div className="flex h-52 items-center justify-center text-slate-500 dark:text-slate-400">
          No products found.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item) => {
            const progress = Math.round(
              (item.sold / maxSold) * 100
            );

            return (
              <div
                key={item.id}
                className="
                  rounded-2xl
                  p-3
                  transition-all
                  hover:bg-[#F8F6F1]
                  dark:hover:bg-[#1A2A25]
                "
              >
                <div className="mb-3 flex items-center justify-between">
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="
                        h-11
                        w-11
                        overflow-hidden
                        rounded-full
                        bg-[#F6F3EC]
                        dark:bg-[#2A3B36]
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">📦</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate font-semibold text-[#032F23] dark:text-white">
                        {item.name}
                      </h4>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.sold.toLocaleString()} units sold
                      </p>
                    </div>
                  </div>

                  {/* Revenue */}
                  <span className="ml-4 flex-shrink-0 font-semibold text-[#032F23] dark:text-white">
                    ₹{Number(item.revenue).toLocaleString("en-IN")}
                  </span>
                </div>

                <ProgressBar
                  value={progress}
                  color="bg-[#D4B56A]"
                />
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}

// import SectionCard from "../ui/SectionCard";
// import ProgressBar from "../ui/ProgressBar";

// const products = [
//   {
//     icon: "🧂",
//     name: "Himalayan Salt Makhana",
//     sold: "4,218 units sold",
//     revenue: "₹231.7k",
//     progress: 95,
//   },
//   {
//     icon: "🌶️",
//     name: "Peri Peri Makhana",
//     sold: "3,604 units sold",
//     revenue: "₹198.2k",
//     progress: 82,
//   },
//   {
//     icon: "🧀",
//     name: "Cheese Makhana",
//     sold: "2,891 units sold",
//     revenue: "₹158.0k",
//     progress: 68,
//   },
//   {
//     icon: "🌿",
//     name: "Pudina Makhana",
//     sold: "2,104 units sold",
//     revenue: "₹115.7k",
//     progress: 52,
//   },
// ];

// export default function TopSellingProducts() {
//   return (
//     <SectionCard
//   className="w-full h-full"
//   title="Top Selling Products"
//   subtitle="This month's bestsellers"
// >
//       <div className="space-y-4">
//         {products.map((item) => (
//           <div
//             key={item.name}
//             className="
//               rounded-2xl
//               p-3
//               transition-all
//               hover:bg-[#F8F6F1]
//               dark:hover:bg-[#1A2A25]
//             "
//           >
//             <div className="flex items-center justify-between mb-3">
//               {/* Left */}
//               <div className="flex items-center gap-3">
//                 <div
//                   className="
//                     h-11
//                     w-11
//                     rounded-full
//                     bg-[#F6F3EC]
//                     dark:bg-[#2A3B36]
//                     flex
//                     items-center
//                     justify-center
//                     text-xl
//                   "
//                 >
//                   {item.icon}
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-[#032F23] dark:text-white">
//                     {item.name}
//                   </h4>

//                   <p className="text-sm text-slate-500">
//                     {item.sold}
//                   </p>
//                 </div>
//               </div>

//               {/* Revenue */}
//               <span className="font-semibold text-[#032F23] dark:text-white">
//                 {item.revenue}
//               </span>
//             </div>

//             <ProgressBar
//               value={item.progress}
//               color="bg-[#D4B56A]"
//             />
//           </div>
//         ))}
//       </div>
//     </SectionCard>
//   );
// }