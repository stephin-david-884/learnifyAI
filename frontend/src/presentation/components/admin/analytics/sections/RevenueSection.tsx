import type { RevenueAnalytics } from "../../../../../types/admin/analytics";
import RevenueTrendChart from "../charts/RevenueTrendChart";
import ChartCard from "../common/ChartCard";
import SectionHeader from "../common/SectionHeader";
import PlanBreakdownChart from "../charts/PlanBreakdownChart";
import BillingCycleChart from "../charts/BillingCycleChart";

interface RevenueSectionProps {
    revenue: RevenueAnalytics | null;
    loading?: boolean;
}

const RevenueSection = ({
    revenue,
    loading = false,
}: RevenueSectionProps) => {

    if (loading) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="Revenue Analytics"
                    description="Monitor revenue, subscriptions and billing insights."
                />

                <div className="grid gap-6 lg:grid-cols-2">

                    {Array.from({ length: 3 }).map((_, index) => (

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

    if (!revenue) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="Revenue Analytics"
                    description="Monitor revenue, subscriptions and billing insights."
                />

                <ChartCard title="Revenue Analytics">

                    <div
                        className="
                            flex
                            h-72
                            items-center
                            justify-center
                            text-gray-500
                        "
                    >
                        No revenue analytics available.
                    </div>

                </ChartCard>

            </section>

        );

    }

    return (

        <section className="space-y-6">

            <SectionHeader
                title="Revenue Analytics"
                description="Monitor revenue trends, subscription plans and billing cycles."
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <ChartCard
                    title="Revenue Trend"
                    subtitle="Revenue generated during the selected period."
                >

                    {/* RevenueTrendChart */}

                    <RevenueTrendChart
                        data={revenue.revenueTrend}
                        loading={loading}
                    />

                </ChartCard>

                <ChartCard
                    title="Subscription Plans"
                    subtitle="Revenue contribution by plan."
                >

                    {/* PlanBreakdownChart */}

                    <PlanBreakdownChart
                        data={revenue.planBreakdown}
                        loading={loading}
                    />

                </ChartCard>

                <ChartCard
                    title="Billing Cycles"
                    subtitle="Monthly vs yearly subscription distribution."
                    className="lg:col-span-2"
                >

                    {/* BillingCycleChart */}

                    <BillingCycleChart
                        data={revenue.billingCycleBreakdown}
                        loading={loading}
                    />

                </ChartCard>

            </div>

        </section>

    );

};

export default RevenueSection;