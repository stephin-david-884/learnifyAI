import React, { useEffect } from "react";
import toast from "react-hot-toast";

import Spinner from "../../components/common/Spinner";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import ContinueLearningCard from "../../components/dashboard/ContinueLearningCard";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import EmptyDashboard from "../../components/dashboard/EmptyDashboard";

import { useDashboard } from "../../../hooks/useDashboard";

const DashboardPage: React.FC = () => {

    const {
        summary,
        loading,
        error,

        getDashboardSummary,
        clearError,
    } = useDashboard();

    useEffect(() => {

        getDashboardSummary();

    }, [getDashboardSummary]);

    useEffect(() => {

        if (!error) {
            return;
        }

        toast.error(error);

        clearError();

    }, [error]);

    if (loading && !summary) {
        return (
            <div className="flex justify-center py-20">
                <Spinner />
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="mx-auto max-w-7xl">
                <EmptyDashboard />
            </div>
        );
    }

    const isFirstTimeUser =
        summary.totalDocuments === 0;

    if (isFirstTimeUser) {
        return (
            <div className="mx-auto max-w-7xl space-y-8">

                <DashboardHeader summary={summary} />

                <EmptyDashboard />

            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            <DashboardHeader summary={summary} />

            <DashboardStats summary={summary} />

            <ContinueLearningCard document={summary.continueLearning} />

            <DashboardCharts summary={summary} />

        </div>
    );
};

export default DashboardPage;