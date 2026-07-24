import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  RefreshCw,
  Loader2,
  Loader
} from "lucide-react";



import { getTechOverview } from "../api/tech.api";

import OverviewCards from "../components/tech/OverviewCards";
import TechFilters from "../components/tech/TechFilters";
import LogsTable from "../components/tech/LogsTable";
import FailedEventsTable from "../components/tech/FailedEventsTable";
import LogDetailsDrawer from "../components/tech/LogDetailsDrawer";

const Tech = () => {
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState(null);

  const [logs, setLogs] = useState([]);

  const [failedEvents, setFailedEvents] =
    useState([]);

  const [selectedLog, setSelectedLog] =
    useState(null);

  const [search, setSearch] = useState("");

  const [level, setLevel] = useState("ALL");

  const [category, setCategory] =
    useState("ALL");

  const [dateRange, setDateRange] =
    useState("ALL");

  const [sort, setSort] =
    useState("NEWEST");

  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

     const response = await getTechOverview();

setOverview(response.overview);
setLogs(response.logs || []);
setFailedEvents(response.failedEvents || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load technical dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const filteredLogs = useMemo(() => {
    let data = [...logs];

    // Search

    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter((log) =>
        [
          log.title,
          log.message,
          log.category,
          log.level,
          JSON.stringify(
            log.metadata || {}
          ),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    // Level

    if (level !== "ALL") {
      data = data.filter(
        (log) => log.level === level
      );
    }

    // Category

    if (category !== "ALL") {
      data = data.filter(
        (log) =>
          log.category === category
      );
    }

    // Date

    if (dateRange !== "ALL") {
      const now = new Date();

      data = data.filter((log) => {
        const created = new Date(
          log.createdAt
        );

        const diff =
          now - created;

        switch (dateRange) {
          case "TODAY":
            return (
              created.toDateString() ===
              now.toDateString()
            );

          case "YESTERDAY": {
            const yesterday =
              new Date(now);

            yesterday.setDate(
              yesterday.getDate() - 1
            );

            return (
              created.toDateString() ===
              yesterday.toDateString()
            );
          }

          case "LAST_7_DAYS":
            return (
              diff <=
              7 *
                24 *
                60 *
                60 *
                1000
            );

          case "LAST_30_DAYS":
            return (
              diff <=
              30 *
                24 *
                60 *
                60 *
                1000
            );

          default:
            return true;
        }
      });
    }

    // Sort

    data.sort((a, b) => {
      if (sort === "OLDEST") {
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );
      }

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    });

    return data;
  }, [
    logs,
    search,
    level,
    category,
    dateRange,
    sort,
  ]);
    if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle
            size={48}
            className="mx-auto mb-4 text-red-500"
          />

          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-white transition hover:bg-gray-800"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Page Header */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Technical Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Monitor system health, operational logs,
              failures and integrations.
            </p>
          </div>

          <button
            onClick={fetchDashboard}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-medium shadow-sm transition hover:bg-gray-100"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Overview */}

        <OverviewCards overview={overview} />

        {/* Filters */}

        <TechFilters
          search={search}
          setSearch={setSearch}
          level={level}
          setLevel={setLevel}
          category={category}
          setCategory={setCategory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sort={sort}
          setSort={setSort}
          resultCount={filteredLogs.length}
          onRefresh={fetchDashboard}
        />

        {/* Recent Logs */}

        <LogsTable
          logs={filteredLogs}
          onView={setSelectedLog}
        />

        {/* Failed Events */}

        <FailedEventsTable
          failedEvents={failedEvents}
        />

        {/* Drawer */}

        <LogDetailsDrawer
          open={Boolean(selectedLog)}
          log={selectedLog}
          onClose={() =>
            setSelectedLog(null)
          }
        />
      </div>
    </>
  );
};

export default Tech;