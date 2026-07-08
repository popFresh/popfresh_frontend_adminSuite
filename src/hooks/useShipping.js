import { useCallback, useEffect, useState } from "react";

import { getShippingDashboard } from "../api/shipping.api.js";

const useShipping = () => {

    // =====================================================
    // States
    // =====================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [stats, setStats] = useState({});

    const [shipments, setShipments] = useState([]);

    const [pagination, setPagination] = useState({});

    // =====================================================
    // Filters
    // =====================================================

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(10);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    // =====================================================
    // Fetch Shipping Dashboard
    // =====================================================

    const fetchShipments = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getShippingDashboard({

                page,

                limit,

                search,

                status,

            });

            setStats(data.stats);

            setShipments(data.shipments);

            setPagination(data.pagination);

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to fetch shipping dashboard."

            );

        } finally {

            setLoading(false);

        }

    }, [

        page,

        limit,

        search,

        status,

    ]);

    // =====================================================
    // Effects
    // =====================================================

    useEffect(() => {

        fetchShipments();

    }, [fetchShipments]);

    // =====================================================
    // Refresh
    // =====================================================

    const refresh = () => {

        fetchShipments();

    };

    // =====================================================
    // Return
    // =====================================================

    return {

        loading,

        error,

        stats,

        shipments,

        pagination,

        page,

        limit,

        search,

        status,

        setPage,

        setLimit,

        setSearch,

        setStatus,

        refresh,

    };

};

export default useShipping;