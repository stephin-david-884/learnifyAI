import type { AIAnalytics } from "../../../../../types/admin/analytics";
import ChartCard from "../common/ChartCard";
import SectionHeader from "../common/SectionHeader";
import DailyAIUsageChart from "../charts/DailyAIUsageChart";

interface AISectionProps {
    ai: AIAnalytics | null;
    loading?: boolean;
}

const AISection = ({
    ai,
    loading = false,
}: AISectionProps) => {

    if (loading) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="AI Analytics"
                    description="Monitor AI usage, providers, models and system performance."
                />

                <div className="grid gap-6 lg:grid-cols-2">

                    {Array.from({ length: 4 }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                h-96
                                animate-pulse
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-100
                            "
                        />

                    ))}

                </div>

            </section>

        );

    }

    if (!ai) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="AI Analytics"
                    description="Monitor AI usage, providers, models and system performance."
                />

                <ChartCard title="AI Analytics">

                    <div
                        className="
                            flex
                            h-72
                            items-center
                            justify-center
                            text-gray-500
                        "
                    >
                        No AI analytics available.
                    </div>

                </ChartCard>

            </section>

        );

    }

    const overview = ai.overview;
    const latency = ai.latencyStatistics;

    return (

        <section className="space-y-6">

            <SectionHeader
                title="AI Analytics"
                description="Track AI requests, providers, models and performance."
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <ChartCard
                    title="Daily AI Requests"
                    subtitle="Daily AI requests during the selected period."
                >

                    {/* DailyAIUsageChart */}

                    <DailyAIUsageChart
                        data={ai.dailyUsage}
                        loading={loading}
                    />

                </ChartCard>

                <ChartCard
                    title="AI Overview"
                    subtitle="Overall AI request statistics."
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Total Requests
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {overview.totalRequests}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Successful
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                {overview.successfulRequests}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Failed
                            </p>

                            <p className="mt-2 text-2xl font-bold text-red-600">
                                {overview.failedRequests}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Success Rate
                            </p>

                            <p className="mt-2 text-2xl font-bold text-blue-600">
                                {overview.successRate}%
                            </p>

                        </div>

                    </div>

                </ChartCard>

                <ChartCard
                    title="AI Performance"
                    subtitle="Latency and estimated AI cost."
                >

                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Average Latency
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {latency.averageLatencyMs} ms
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Minimum Latency
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                {latency.minimumLatencyMs} ms
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Maximum Latency
                            </p>

                            <p className="mt-2 text-2xl font-bold text-red-600">
                                {latency.maximumLatencyMs} ms
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Estimated Cost
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                ₹{ai.estimatedCost.toLocaleString()}
                            </p>

                        </div>

                    </div>

                </ChartCard>

                <ChartCard
                    title="AI Distribution"
                    subtitle="Providers, models and feature usage."
                    className="lg:col-span-2"
                >

                    {/* FeatureUsageChart */}
                    {/* ProviderUsageChart */}
                    {/* ModelUsageChart */}

                    <div
                        className="
                            grid
                            gap-6
                            md:grid-cols-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-56
                                items-center
                                justify-center
                                rounded-lg
                                border-2
                                border-dashed
                                border-gray-200
                                text-gray-400
                            "
                        >
                            FeatureUsageChart
                        </div>

                        <div
                            className="
                                flex
                                h-56
                                items-center
                                justify-center
                                rounded-lg
                                border-2
                                border-dashed
                                border-gray-200
                                text-gray-400
                            "
                        >
                            ProviderUsageChart
                        </div>

                        <div
                            className="
                                flex
                                h-56
                                items-center
                                justify-center
                                rounded-lg
                                border-2
                                border-dashed
                                border-gray-200
                                text-gray-400
                            "
                        >
                            ModelUsageChart
                        </div>

                    </div>

                </ChartCard>

            </div>

        </section>

    );

};

export default AISection;