import { useEffect, useState } from "react";

import { IndianRupee, Package, ShoppingBag, Users } from "lucide-react";

import { getDashboard } from "../api/dashboard.api";

import DashboardHero from "../components/dashboard/DashboardHero";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";
import TopSellingProducts from "../components/dashboard/TopSellingProducts";
import InventoryOverview from "../components/dashboard/InventoryOverview";
import CustomerOverview from "../components/dashboard/CustomerOverview";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboard();

      setDashboard(data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-500">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <DashboardHero
        adminName={dashboard.summary.adminName}
        pendingActions={dashboard.summary.pendingActions}
        lowStockProducts={dashboard.summary.lowStockProducts}
         onRefresh={fetchDashboard}
  loading={loading}

      />

      {/* KPI Cards */}
      <div className="grid gap-5 lg:grid-cols-4">
        <StatCard
          title="TODAY'S ORDERS"
          value={dashboard.summary.todayOrders}
          growth={dashboard.summary.todayOrdersGrowth}
          subtitle="vs. yesterday"
          icon={ShoppingBag}
        />

        <StatCard
          title="REVENUE TODAY"
          value={`₹${Number(
            dashboard.summary.todayRevenue
          ).toLocaleString("en-IN")}`}
          growth={dashboard.summary.todayRevenueGrowth}
          subtitle="vs. yesterday"
          icon={IndianRupee}
        />

        <StatCard
          title="PENDING ACTIONS"
          value={dashboard.summary.pendingActions}
          subtitle="orders need processing"
          icon={Users}
        />

        <StatCard
          title="LOW STOCK PRODUCTS"
          value={dashboard.summary.lowStockProducts}
          subtitle="products running low"
          icon={Package}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mt-6">
        <RevenueChart />
      </div>

      {/* Orders + Notifications */}
      <div className="mt-6 grid gap-5 xl:grid-cols-4">
        <div className="xl:col-span-3">
          <RecentOrdersTable
            data={dashboard.recentOrders.orders}
          />
        </div>

        <NotificationsPanel
          data={dashboard.notifications}
        />
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid gap-5 lg:grid-cols-12 items-stretch">
        <div className="flex lg:col-span-4">
          <TopSellingProducts
            data={dashboard.topProducts}
          />
        </div>

        <div className="flex lg:col-span-4">
          <InventoryOverview
            data={dashboard.inventory}
          />
        </div>

        <div className="flex lg:col-span-4">
          <CustomerOverview
            data={dashboard.customers}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;