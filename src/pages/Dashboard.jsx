import PageWrapper from "../components/layout/PageWrapper";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";
import TopSellingProducts from "../components/dashboard/TopSellingProducts";
import InventoryOverview from "../components/dashboard/InventoryOverview";

import DashboardHero from "../components/dashboard/DashboardHero";
import CustomerOverview from "../components/dashboard/CustomerOverview";

import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
} from "lucide-react";

const Dashboard = () => {
  return (
    <>
     <DashboardHero />

      {/* KPI Cards */}
      <div className="grid gap-5 lg:grid-cols-4">
  <StatCard
    title="TODAY'S ORDERS"
    value="128"
    growth="12%"
    subtitle="vs. yesterday"
    icon={ShoppingBag}
  />

  <StatCard
    title="REVENUE TODAY"
    value="₹42,850"
    growth="8%"
    subtitle="vs. yesterday"
    icon={IndianRupee}
  />

  <StatCard
    title="PENDING ACTIONS"
    value="18"
    subtitle="orders need processing"
    icon={Users}
  />

  <StatCard
    title="INVENTORY HEALTH"
    value="4"
    subtitle="products running low"
    icon={Package}
  />
</div>

      {/* Revenue Chart */}
      <div className="mt-6">
        <RevenueChart />
      </div>

      {/* Orders + Notifications */}
      <div className="grid gap-5 xl:grid-cols-4 mt-6">
        <div className="xl:col-span-3">
          <RecentOrdersTable />
        </div>

        <NotificationsPanel />
      </div>

      {/* Bottom Section */}
     <div className="grid gap-5 lg:grid-cols-12 mt-6 items-stretch">
  <div className="lg:col-span-4 flex">
    <TopSellingProducts />
  </div>

  <div className="lg:col-span-4 flex">
    <InventoryOverview />
  </div>

  <div className="lg:col-span-4 flex">
    <CustomerOverview />
  </div>
</div>
    </>
  );
};

export default Dashboard;