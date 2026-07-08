import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import CustomersHero from "../components/customers/CustomersHero";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerDrawer from "../components/customers/CustomerDrawer";

import StatCard from "../components/dashboard/StatCard";

import {
  Users,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

import {
  getCustomers,
  getCustomerStats,
  getCustomerById,
} from "../api/customer.api";

const Customers = () => {
  //////////////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////////////

  const [customers, setCustomers] = useState([]);

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    revenue: 0,
    repeatCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCustomers: 0,
    totalPages: 1,
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Spinner only on clicked View button
  const [loadingCustomerId, setLoadingCustomerId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////
  // FETCH CUSTOMERS
  //////////////////////////////////////////////////////////

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers({
        page,
        limit: 10,
        search: searchTerm,
      });

      setCustomers(data.customers);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
useEffect(() => {
  const openCustomerFromSearch = async () => {
    const customerId = location.state?.entityId;

    if (!customerId) return;

    try {
      const customer = await getCustomerById(customerId);

      setSelectedCustomer(customer);

      setDrawerOpen(true);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  openCustomerFromSearch();
}, [location.state]);

  //////////////////////////////////////////////////////////
  // FETCH STATS
  //////////////////////////////////////////////////////////

  const fetchStats = async () => {
    try {
      const data = await getCustomerStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////////////////////////////////////////
  // EFFECTS
  //////////////////////////////////////////////////////////

  useEffect(() => {
    fetchCustomers();
  }, [page, searchTerm]);

  useEffect(() => {
    fetchStats();
  }, []);

  //////////////////////////////////////////////////////////
  // REFRESH
  //////////////////////////////////////////////////////////

  const handleRefresh = async () => {
    try {
      setLoading(true);

      setSearchTerm("");

      setPage(1);

      const [customersData, statsData] = await Promise.all([
        getCustomers({
          page: 1,
          limit: 10,
          search: "",
        }),

        getCustomerStats(),
      ]);

      setCustomers(customersData.customers);

      setPagination(customersData.pagination);

      setStats(statsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////////
  // VIEW CUSTOMER
  //////////////////////////////////////////////////////////

  const handleViewCustomer = async (customerId) => {
    try {
      setLoadingCustomerId(customerId);

      const customer = await getCustomerById(customerId);

      setSelectedCustomer(customer);

      setDrawerOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCustomerId(null);
    }
  };

  //////////////////////////////////////////////////////////
  // CLOSE DRAWER
  //////////////////////////////////////////////////////////

  const handleCloseDrawer = () => {
    setDrawerOpen(false);

    setSelectedCustomer(null);
  };

  //////////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////////

  return (
    <>
      <CustomersHero
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        onRefresh={handleRefresh}
      />

      {/* KPI */}

      <div className="grid gap-5 lg:grid-cols-4">
        <StatCard
          title="TOTAL CUSTOMERS"
          value={stats.totalCustomers}
          subtitle="registered customers"
          icon={Users}
        />

        <StatCard
          title="TOTAL ORDERS"
          value={stats.totalOrders}
          subtitle="orders placed"
          icon={ShoppingBag}
        />

        <StatCard
          title="LIFETIME REVENUE"
          value={`₹${Number(stats.revenue).toLocaleString()}`}
          subtitle="customer spending"
          icon={IndianRupee}
        />

        <StatCard
          title="REPEAT CUSTOMERS"
          value={stats.repeatCustomers}
          subtitle="ordered more than once"
          icon={Users}
        />
      </div>

      {/* TABLE */}

      <div className="mt-6">
        <CustomersTable
          customers={customers}
          loading={loading}
          pagination={pagination}
          onPageChange={setPage}
          onView={handleViewCustomer}
          loadingCustomerId={loadingCustomerId}
        />
      </div>

      {/* DRAWER */}

      <CustomerDrawer
        customer={selectedCustomer}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default Customers;