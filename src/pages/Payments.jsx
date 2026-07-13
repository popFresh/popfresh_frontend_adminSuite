import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import PaymentsHero from "../components/payments/PaymentsHero";
import PaymentTable from "../components/payments/PaymentTable";
import PaymentDrawer from "../components/payments/PaymentDrawer";

import StatCard from "../components/dashboard/StatCard";

import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";

import {
  getPayments,
  getPaymentStats,
  getPaymentById,
} from "../api/payment.api";

const Payments = () => {
  
  const [payments, setPayments] = useState([]);
  

  const [stats, setStats] = useState({

    totalPayments: 0,

    successfulPayments: 0,

    pendingPayments: 0,

    revenue: 0,

  });

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({

    page: 1,

    limit: 10,

    totalPayments: 0,

    totalPages: 1,

  });

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [viewLoadingId, setViewLoadingId] =
  useState(null);

const { socket } = useSocket();

  //////////////////////////////////////////////////////////
  // FETCH PAYMENTS
  //////////////////////////////////////////////////////////

 const fetchPayments = async (showLoader = true) => {
  try {
    if (showLoader) {
      setLoading(true);
    }

    const data = await getPayments({
      page,
      limit: 10,
      search: searchTerm,
      status,
    });

    setPayments(data.payments);
    setPagination(data.pagination);

  } catch (err) {
    console.error(err);
  } finally {
    if (showLoader) {
      setLoading(false);
    }
  }
};
  //////////////////////////////////////////////////////////
  // FETCH STATS
  //////////////////////////////////////////////////////////

  const fetchStats = async () => {

    try {

      const data = await getPaymentStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    }

  };

  //////////////////////////////////////////////////////////
  // INITIAL LOAD
  //////////////////////////////////////////////////////////

  useEffect(() => {

    fetchPayments();

  }, [page, searchTerm, status]);

  useEffect(() => {

    fetchStats();

  }, []);

  useEffect(() => {
  const handlePaymentUpdated = async () => {
  try {
    await Promise.all([
      fetchPayments(false),
      fetchStats(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

  socket.on("payment:updated", handlePaymentUpdated);

  return () => {
    socket.off("payment:updated", handlePaymentUpdated);
  };
}, [socket, page, searchTerm, status]);

  //////////////////////////////////////////////////////////
  // REFRESH
  //////////////////////////////////////////////////////////

  const handleRefresh = async () => {

    setSearchTerm("");

    setStatus("");

    setPage(1);

    await fetchStats();

    await fetchPayments();

  };

  //////////////////////////////////////////////////////////
  // VIEW PAYMENT
  //////////////////////////////////////////////////////////

  const handleViewPayment = async (paymentId) => {

  try {

    setViewLoadingId(paymentId);

    const payment =
      await getPaymentById(paymentId);

    setSelectedPayment(payment);

    setDrawerOpen(true);

  } catch (err) {

    console.error(err);

  } finally {

    setViewLoadingId(null);

  }

};

  //////////////////////////////////////////////////////////
  // CLOSE DRAWER
  //////////////////////////////////////////////////////////

  const handleCloseDrawer = () => {

    setDrawerOpen(false);

    setSelectedPayment(null);

  };

  return (
    <>

      <PaymentsHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        onRefresh={handleRefresh}
      />

      {/* KPI */}

      <div className="grid gap-5 lg:grid-cols-4">

        <StatCard
          title="TOTAL REVENUE"
          value={`₹${Number(stats.revenue).toLocaleString()}`}
          subtitle="successful payments"
          icon={IndianRupee}
        />

        <StatCard
          title="TOTAL PAYMENTS"
          value={stats.totalPayments}
          subtitle="all transactions"
          icon={CreditCard}
        />

        <StatCard
          title="SUCCESSFUL"
          value={stats.successfulPayments}
          subtitle="completed payments"
          icon={CheckCircle2}
        />

        <StatCard
          title="PENDING"
          value={stats.pendingPayments}
          subtitle="awaiting confirmation"
          icon={Clock3}
        />

      </div>

      {/* TABLE */}

      <div className="mt-6">

        <PaymentTable
          payments={payments}
          loading={loading}
          page={page}
          pagination={pagination}
          onPageChange={setPage}
          onView={handleViewPayment}
          viewLoadingId={viewLoadingId}
          selectedPayment={selectedPayment}
        />

      </div>

      {/* DRAWER */}

      <PaymentDrawer
        payment={selectedPayment}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />

    </>
  );

};

export default Payments;