import SectionCard from "../ui/SectionCard";
import ProgressBar from "../ui/ProgressBar";

const products = [
  {
    icon: "🧂",
    name: "Himalayan Salt Makhana",
    sold: "4,218 units sold",
    revenue: "₹231.7k",
    progress: 95,
  },
  {
    icon: "🌶️",
    name: "Peri Peri Makhana",
    sold: "3,604 units sold",
    revenue: "₹198.2k",
    progress: 82,
  },
  {
    icon: "🧀",
    name: "Cheese Makhana",
    sold: "2,891 units sold",
    revenue: "₹158.0k",
    progress: 68,
  },
  {
    icon: "🌿",
    name: "Pudina Makhana",
    sold: "2,104 units sold",
    revenue: "₹115.7k",
    progress: 52,
  },
];

export default function TopSellingProducts() {
  return (
    <SectionCard
  className="w-full h-full"
  title="Top Selling Products"
  subtitle="This month's bestsellers"
>
      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item.name}
            className="
              rounded-2xl
              p-3
              transition-all
              hover:bg-[#F8F6F1]
              dark:hover:bg-[#1A2A25]
            "
          >
            <div className="flex items-center justify-between mb-3">
              {/* Left */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    h-11
                    w-11
                    rounded-full
                    bg-[#F6F3EC]
                    dark:bg-[#2A3B36]
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold text-[#032F23] dark:text-white">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.sold}
                  </p>
                </div>
              </div>

              {/* Revenue */}
              <span className="font-semibold text-[#032F23] dark:text-white">
                {item.revenue}
              </span>
            </div>

            <ProgressBar
              value={item.progress}
              color="bg-[#D4B56A]"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}