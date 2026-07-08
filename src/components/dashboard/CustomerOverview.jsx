import Card from "../ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2F4F3E",
  "#D4B56A",
];

export default function CustomerOverview({
  data = {},
}) {
  const {
    totalCustomers = 0,
    newCustomersThisMonth = 0,
    returningPercentage = 0,
    newPercentage = 0,
    averageOrderValue = 0,
  } = data;

  const chartData = [
    {
      name: "Returning",
      value: returningPercentage,
    },
    {
      name: "New",
      value: newPercentage,
    },
  ];

  return (
    <Card className="h-full w-full">
      <h3 className="text-xl font-semibold text-[#032F23] dark:text-white">
        Customer Overview
      </h3>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative h-[180px] w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-[#0F172A] dark:text-white">
              {totalCustomers}
            </span>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Customers
            </span>
          </div>
        </div>

        <div className="w-full mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#31403B] pb-3">
            <span className="text-slate-500 dark:text-slate-400">
              New this month
            </span>

            <span className="font-bold text-xl text-[#032F23] dark:text-white">
              {newCustomersThisMonth}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#31403B] pb-3">
            <span className="text-slate-500 dark:text-slate-400">
              Returning rate
            </span>

            <span className="font-semibold text-xl text-[#032F23] dark:text-white">
              {returningPercentage}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Avg order value
            </span>

            <span className="font-semibold text-xl text-[#032F23] dark:text-white">
              ₹{Number(averageOrderValue).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// import Card from "../ui/Card";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Returning",
//     value: 64,
//   },
//   {
//     name: "New",
//     value: 36,
//   },
// ];

// const COLORS = [
//   "#2F4F3E",
//   "#D4B56A",
// ];

// export default function CustomerOverview() {
//   return (
//     <Card className="h-full w-full">
//       <h3 className="text-xl font-semibold text-[#032F23] dark:text-white">
//         Customer Overview
//       </h3>

//       <div className="mt-6 flex flex-col items-center">
//         {/* Donut Chart */}
//         <div className="relative h-[180px] w-[180px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 innerRadius={50}
//                 outerRadius={75}
//                 paddingAngle={2}
//                 stroke="none"
//               >
//                 {data.map((entry, index) => (
//                   <Cell
//                     key={index}
//                     fill={COLORS[index]}
//                   />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>

//           {/* Center Content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//             <span className="text-2xl font-bold text-[#0F172A] dark:text-white">
//               64%
//             </span>

//             <span className="text-sm text-slate-500 dark:text-slate-400">
//               Returning
//             </span>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="w-full mt-6 space-y-4">
//           <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#31403B] pb-3">
//             <span className="text-slate-500 dark:text-slate-400">
//               New this month
//             </span>

//             <span className="font-bold text-xl text-[#032F23] dark:text-white">
//               284
//             </span>
//           </div>

//           <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#31403B] pb-3">
//             <span className="text-slate-500 dark:text-slate-400">
//               Returning rate
//             </span>

//             <span className="font-semibold text-xl text-[#032F23] dark:text-white">
//               64%
//             </span>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-slate-500 dark:text-slate-400">
//               Avg order value
//             </span>

//             <span className="font-semibold text-xl text-[#032F23] dark:text-white">
//               ₹486
//             </span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }