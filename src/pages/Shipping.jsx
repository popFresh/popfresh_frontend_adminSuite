import { RefreshCw } from "lucide-react";

import useShipping from "../hooks/useShipping";

import PageWrapper from "../components/layout/PageWrapper";

import ShippingStats from "../components/shipping/ShippingStats";
import ShipmentFilters from "../components/shipping/ShipmentFilters";
import ShipmentTable from "../components/shipping/ShipmentTable";

const Shipping = () => {

    const {

        loading,

        error,

        stats,

        shipments,

        pagination,

        page,

        search,

        status,

        setPage,

        setSearch,

        setStatus,

        refresh,

    } = useShipping();

    return (

        <>

            {/* ===================================================== */}
            {/* Hero */}
            {/* ===================================================== */}

            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <PageWrapper
                    title="Shipping"
                    subtitle="Manage shipments, courier partners and delivery tracking."
                />

                <div className="flex items-center gap-3">

                    <button
                        onClick={refresh}
                        disabled={loading}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-[#18211D]
                            text-slate-700
                            dark:text-white
                            transition-all
                            hover:border-orange-300
                            hover:bg-orange-50
                            dark:hover:bg-[#111916]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />

                    </button>

                </div>

            </div>

            {/* ===================================================== */}
            {/* Error */}
            {/* ===================================================== */}

            {error && (

                <div
                    className="
                        mb-6
                        rounded-2xl
                        border
                        border-red-200
                        dark:border-red-900/40
                        bg-red-50
                        dark:bg-red-950/20
                        px-4
                        py-3
                        text-sm
                        text-red-600
                        dark:text-red-300
                    "
                >

                    {error}

                </div>

            )}

            {/* ===================================================== */}
            {/* KPI */}
            {/* ===================================================== */}

            <ShippingStats
                stats={stats}
            />

            {/* ===================================================== */}
            {/* Filters */}
            {/* ===================================================== */}

            <div className="mt-6">

                <ShipmentFilters

                    search={search}

                    status={status}

                    onSearchChange={(value) => {

                        setSearch(value);

                        setPage(1);

                    }}

                    onStatusChange={(value) => {

                        setStatus(value);

                        setPage(1);

                    }}

                />

            </div>

            {/* ===================================================== */}
            {/* Table */}
            {/* ===================================================== */}

            <div className="mt-6">

                <ShipmentTable

                    loading={loading}

                    shipments={shipments}

                    pagination={pagination}

                    page={page}

                    onPageChange={setPage}

                />

            </div>

        </>

    );

};

export default Shipping;