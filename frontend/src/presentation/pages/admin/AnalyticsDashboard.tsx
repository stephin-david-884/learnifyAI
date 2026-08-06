import { useCallback, useEffect } from "react";

import useAnalytics from "../../../hooks/useAnalytics";

import AnalyticsFilterBar from "../../components/admin/analytics/filters/AnalyticsFilterBar";

import OverviewSection from "../../components/admin/analytics/sections/OverviewSection";
import RevenueSection from "../../components/admin/analytics/sections/RevenueSection";
import UserSection from "../../components/admin/analytics/sections/UserSection";
import DocumentSection from "../../components/admin/analytics/sections/DocumentSection";
import AISection from "../../components/admin/analytics/sections/AISection";

const AnalyticsDashboard = () => {

    const {
        dashboard,
        revenue,
        users,
        documents,
        ai,

        loading,
        refreshing,
        error,
        filter,

        fetchDashboardSummary,
        fetchRevenueAnalytics,
        fetchUserAnalytics,
        fetchDocumentAnalytics,
        fetchAIAnalytics,

        setFilter,
        clearError,
    } = useAnalytics();

    const loadAnalytics = useCallback(async () => {

        await Promise.all([
            fetchDashboardSummary(filter),
            fetchRevenueAnalytics(filter),
            fetchUserAnalytics(filter),
            fetchDocumentAnalytics(filter),
            fetchAIAnalytics(filter),
        ]);

    }, [
        filter,
        fetchDashboardSummary,
        fetchRevenueAnalytics,
        fetchUserAnalytics,
        fetchDocumentAnalytics,
        fetchAIAnalytics,
    ]);

    useEffect(() => {

        loadAnalytics();

    }, [loadAnalytics]);

    return (

        <div className="space-y-8">

            <AnalyticsFilterBar
                filter={filter}
                refreshing={refreshing}
                onFilterChange={setFilter}
                onRefresh={loadAnalytics}
            />

            {error && (

                <div
                    className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                    "
                >

                    <div className="flex items-center justify-between">

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={clearError}
                            className="
                                text-sm
                                font-medium
                                text-red-600
                                hover:underline
                            "
                        >
                            Dismiss
                        </button>

                    </div>

                </div>

            )}

            <OverviewSection
                dashboard={dashboard}
                loading={loading}
            />

            <RevenueSection
                revenue={revenue}
                loading={loading}
            />

            <UserSection
                users={users}
                loading={loading}
            />

            <DocumentSection
                documents={documents}
                loading={loading}
            />

            <AISection
                ai={ai}
                loading={loading}
            />

        </div>

    );

};

export default AnalyticsDashboard;