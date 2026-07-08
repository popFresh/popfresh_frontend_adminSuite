import { useState, useEffect } from "react";
import { getRevenueChart } from "../../api/dashboard.api";
import Card from "../ui/Card";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// const revenueData = {
//   "7D": [
//     { label: "Mon", value: 33000 },
//     { label: "Tue", value: 39000 },
//     { label: "Wed", value: 30000 },
//     { label: "Thu", value: 43000 },
//     { label: "Fri", value: 52000 },
//     { label: "Sat", value: 61000 },
//     { label: "Sun", value: 43000 },
//   ],

//   "30D": [
//     { label: "W1", value: 120000 },
//     { label: "W2", value: 145000 },
//     { label: "W3", value: 132000 },
//     { label: "W4", value: 172000 },
//   ],

//   "90D": [
//     { label: "Jan", value: 320000 },
//     { label: "Feb", value: 410000 },
//     { label: "Mar", value: 380000 },
//   ],

//   "1Y": [
//     { label: "Q1", value: 900000 },
//     { label: "Q2", value: 1120000 },
//     { label: "Q3", value: 1280000 },
//     { label: "Q4", value: 1450000 },
//   ],
// };

// const ordersData = {
//   "7D": [
//     { label: "Mon", value: 62 },
//     { label: "Tue", value: 74 },
//     { label: "Wed", value: 58 },
//     { label: "Thu", value: 89 },
//     { label: "Fri", value: 103 },
//     { label: "Sat", value: 120 },
//     { label: "Sun", value: 84 },
//   ],

//   "30D": [
//     { label: "W1", value: 420 },
//     { label: "W2", value: 510 },
//     { label: "W3", value: 485 },
//     { label: "W4", value: 620 },
//   ],

//   "90D": [
//     { label: "Jan", value: 1450 },
//     { label: "Feb", value: 1780 },
//     { label: "Mar", value: 1690 },
//   ],

//   "1Y": [
//     { label: "Q1", value: 4200 },
//     { label: "Q2", value: 5100 },
//     { label: "Q3", value: 5900 },
//     { label: "Q4", value: 6700 },
//   ],
// };

export default function RevenueChart() {
  const [metric, setMetric] = useState("revenue");
  const [range, setRange] = useState("7d");
  const [chart, setChart] = useState({
  totalRevenue: 0,
  totalOrders: 0,
  chart: [],
});

const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const fetchChart = async (selectedRange) => {
  try {
    setLoading(true);

    const data = await getRevenueChart(selectedRange);

    setChart(data);
  } catch (error) {
  console.error("Failed to fetch revenue chart:", error);

  setChart({
    totalRevenue: 0,
    totalOrders: 0,
    chart: [],
  });
} finally {
  setLoading(false);
}
};

useEffect(() => {
  fetchChart(range);
}, [range]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);


  const chartData = chart?.chart;

  // const chartData =
  //   metric === "revenue"
  //     ? revenueData[range]
  //     : ordersData[range];

  // const displayValue =
  //   metric === "revenue"
  //     ? "₹2,98,350"
  //     : "1,248";

  const displayValue =
  metric === "revenue"
    ? `₹${Number(chart?.totalRevenue).toLocaleString("en-IN")}`
    : Number(chart?.totalOrders).toLocaleString("en-IN");

  const chartTitle =
    metric === "revenue"
      ? "Revenue Performance"
      : "Order Performance";

  return (
    <Card className="p-6 lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {chartTitle}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#0F172A] dark:text-white">
            {displayValue}
          </h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Metric Toggle */}
          <div className="flex rounded-2xl bg-[#F4EFE4] dark:bg-[#24322D] p-1">
            {["revenue", "orders"].map((item) => (
              <button
                key={item}
                onClick={() => setMetric(item)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  metric === item
                    ? "bg-white dark:bg-[#A8C89A] dark:text-[#0F1412] shadow-sm"
                    : "text-slate-600 dark:text-[#A8B3AC]"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Range Toggle */}
          <div className="flex rounded-2xl bg-[#F4EFE4] dark:bg-[#24322D] p-1">
            {/* {["7D", "30D", "90D", "1Y"].map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  range === item
                    ? "bg-white dark:bg-[#A8C89A] dark:text-[#0F1412] shadow-sm"
                    : "text-slate-600 dark:text-[#A8B3AC]"
                }`}
              >
                {item}
              </button>
            )) */
            // }
            [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
].map((item) => (
  <button
    key={item.value}
    onClick={() => {
      setRange(item.value);
    
    }}
   className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
  range === item.value
    ? "bg-white dark:bg-[#A8C89A] dark:text-[#0F1412] shadow-sm"
    : "text-slate-600 dark:text-[#A8B3AC]"
}`}
  >
    {item.label}
  </button>
))
            }
          </div>
        </div>
      </div>

      

      {/* Chart */}
      <div className="mt-8 h-[320px]">

        {loading ? (
  <div className="flex h-[320px] items-center justify-center">
    <p className="text-slate-500">
      Loading chart...
    </p>
  </div>
) : (
        <ResponsiveContainer
          width="99%"
          height="100%"
          debounce={100}
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={isDark ? "#A8C89A" : "#032F23"}
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor={isDark ? "#D4B56A" : "#032F23"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke={isDark ? "#31403B" : "#D8D5CD"}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: isDark ? "#94A3B8" : "#64748B",
              }}
            />

            <YAxis
  tickFormatter={(value) =>
    metric === "revenue"
      ? `₹${(value / 1000).toFixed(0)}k`
      : value
  }
  tickLine={false}
  axisLine={false}
  tick={{
    fill: isDark ? "#94A3B8" : "#64748B",
  }}
/>

           <Tooltip
  formatter={(value) =>
    metric === "revenue"
      ? [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]
      : [value, "Orders"]
  }
  labelStyle={{
    color: isDark ? "#F3F4F1" : "#0F172A",
  }}
  itemStyle={{
    color: isDark ? "#F3F4F1" : "#0F172A",
  }}
  contentStyle={{
    background: isDark ? "#1D2924" : "#FFFFFF",
    border: "none",
    borderRadius: "12px",
  }}
/>
{/* 
            <Area
              type="natural"
              dataKey="value"
              stroke={
                isDark
                  ? "#D4B56A"
                  : "#2F4F3E"
              }
              strokeWidth={4}
              fill="url(#revenueGradient)"
            /> */}

       <Area
  type="monotone"
  dataKey={metric === "revenue" ? "revenue" : "orders"}
  stroke={isDark ? "#D4B56A" : "#2F4F3E"}
  strokeWidth={3}
  fill="url(#revenueGradient)"
/>
          </AreaChart>
        </ResponsiveContainer>

        )}
      </div>
    </Card>
  );
}