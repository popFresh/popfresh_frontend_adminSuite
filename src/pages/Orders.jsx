import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import {
  getOrders,
  getOrderStats,
  getOrderById
} from "../api/order.api";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersHero from "../components/orders/OrdersHero";
import OrdersTable from "../components/orders/OrdersTable";
import OrderDrawer from "../components/orders/OrderDrawer";
import Pagination from "../components/Pagination";
import StatCard from "../components/dashboard/StatCard";


import {
  ShoppingBag,
  PackageCheck,
  Truck,
  IndianRupee,
} from "lucide-react";

const Orders = () => {
  // ==================================================
  // Orders
  // ==================================================

  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);

const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
  totalOrders: 0,
  totalPages: 1,
});

  const [stats, setStats] = useState({
    totalOrders: 0,
    processing: 0,
    shipped: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [viewLoadingId, setViewLoadingId] =
    useState(null);

  // ==================================================
  // Filters
  // ==================================================

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  
const location = useLocation();
const navigate = useNavigate();
const { socket } = useSocket();

  // ==================================================
  // Drawer
  // ==================================================

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  // ==================================================
  // Fetch Orders
  // ==================================================
const fetchOrders = async ({
  pageNo = page,
  status =
    selectedStatus === "All"
      ? ""
      : selectedStatus.toUpperCase(),
  search = searchTerm,
  sortBy = sort,
} = {}) => {

  try {
    setLoading(true);

    const result = await getOrders({
      page: pageNo,
      status,
      search,
      sort: sortBy,
    });

    setOrders(result.orders);
    setPagination(result.pagination);

  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  const openOrderFromSearch = async () => {
    const orderId = location.state?.entityId;

    if (!orderId) return;

    try {
      setViewLoadingId(orderId);

      const order = await getOrderById(orderId);

      setSelectedOrder(order);
      setDrawerOpen(true);
      navigate(location.pathname, {
  replace: true,
  state: null,
});
    } catch (error) {
      console.error(error);
    } finally {
      setViewLoadingId(null);
    }
  };

  openOrderFromSearch();
}, [location.state]);

  // ==================================================
  // Fetch Dashboard Stats
  // ==================================================

  const fetchStats = async () => {
    try {
      const data =
        await getOrderStats();

      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================================
  // Initial Stats
  // ==================================================

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
  const handleOrderUpdated = () => {
    
    
     Promise.all([
    fetchOrders(),
    fetchStats(),
  ]);
  };

  socket.on("order:updated", handleOrderUpdated);

  return () => {
    socket.off("order:updated", handleOrderUpdated);
  };
}, [socket, page, selectedStatus, searchTerm, sort]);

  // ==================================================
  // Orders Fetch (Search + Status + Sort)
  // ==================================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOrders();
    }, 350);

    return () =>
      clearTimeout(timeout);
  }, [
    searchTerm,
    selectedStatus,
    sort,
    page,
  ]);


  useEffect(() => {
  setPage(1);
}, [
  searchTerm,
  selectedStatus,
  sort,
]);
  // ==================================================
  // Refresh
  // ==================================================

  const handleRefresh = async () => {
  try {
    setRefreshing(true);

    // Reset UI
    setSearchTerm("");
    setSelectedStatus("All");
    setSort("newest");

    // Fetch fresh data immediately
    await Promise.all([
      fetchOrders({
        status: "",
        search: "",
        sort: "newest",
      }),
      fetchStats(),
    ]);

  } finally {
    setRefreshing(false);
  }
};

  // ==================================================
  // View Order
  // ==================================================

  const handleViewOrder = (
    order
  ) => {
    setViewLoadingId(order.id);

    setSelectedOrder(order);

    setDrawerOpen(true);
  };

  const handleCloseDrawer =
    () => {
      setDrawerOpen(false);

      setSelectedOrder(null);

      setViewLoadingId(null);
    };



  return (
    <>

        <OrdersHero
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  onRefresh={handleRefresh}
  refreshing={refreshing}
/>
      {/* KPI Cards */}

      <div className="grid gap-5 lg:grid-cols-4">
        <StatCard
          title="TOTAL ORDERS"
          value={
            stats.totalOrders
          }
          subtitle="all customer orders"
          icon={ShoppingBag}
        />

        <StatCard
          title="PROCESSING"
          value={
            stats.processing
          }
          subtitle="awaiting dispatch"
          icon={PackageCheck}
        />

        <StatCard
          title="SHIPPED"
          value={
            stats.shipped
          }
          subtitle="currently in transit"
          icon={Truck}
        />

        <StatCard
          title="TOTAL REVENUE"
          value={`₹${Number(
            stats.revenue
          ).toLocaleString()}`}
          subtitle="from all orders"
          icon={IndianRupee}
        />
      </div>

      {/* Status Pills */}

      <div className="mt-6 flex flex-wrap gap-3">
        {[
          "All",
          "Pending",
          "Processing",
          "Packed",
          "Shipped",
          "Delivered",
          "Cancelled",
          "Returned",
        ].map((status) => (
          <button
            key={status}
            onClick={() =>
              setSelectedStatus(
                status
              )
            }
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              selectedStatus ===
              status
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders */}

      <div className="mt-6">
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center">
            Loading orders...
          </div>
        ) : (
          <OrdersTable
            orders={orders}
            onView={
              handleViewOrder
            }
            viewLoadingId={
              viewLoadingId
            }
          />
        )}
      </div>

      <Pagination
  pagination={pagination}
  onPageChange={setPage}
/>

      {/* Order Drawer */}

      <OrderDrawer
        order={
          selectedOrder
        }
        open={drawerOpen}
        onClose={
          handleCloseDrawer
        }
        onLoaded={() =>
          setViewLoadingId(
            null
          )
        }
        onOrderUpdated={async () => {
          await fetchOrders();

          await fetchStats();
        }}
      />

      
    </>
  );
};

export default Orders;