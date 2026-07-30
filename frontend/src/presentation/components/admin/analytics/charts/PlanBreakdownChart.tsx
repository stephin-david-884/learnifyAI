import { useMemo } from "react";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import type { PlanRevenueBreakdown } from "../../../../../types/admin/analytics";

interface PlanBreakdownChartProps {
    data: PlanRevenueBreakdown[];
    loading?: boolean;
}

interface ChartData {
    planName: string;
    MONTHLY: number;
    YEARLY: number;
}

const PlanBreakdownChart = ({
    data,
    loading = false,
}: PlanBreakdownChartProps) => {

    const chartData = useMemo<ChartData[]>(() => {

        const grouped = new Map<string, ChartData>();

        data.forEach((item) => {

            if (!grouped.has(item.planName)) {

                grouped.set(item.planName, {
                    planName: item.planName,
                    MONTHLY: 0,
                    YEARLY: 0,
                });

            }

            const current = grouped.get(item.planName)!;

            current[item.billingCycle] = item.revenue;

        });

        return Array.from(grouped.values());

    }, [data]);

    if (loading) {

        return (

            <div
                className="
                    flex
                    h-72
                    animate-pulse
                    items-center
                    justify-center
                    rounded-lg
                    bg-gray-100
                "
            >
                <span className="text-sm text-gray-400">
                    Loading chart...
                </span>
            </div>

        );

    }

    if (!chartData.length) {

        return (

            <div
                className="
                    flex
                    h-72
                    items-center
                    justify-center
                    rounded-lg
                    border-2
                    border-dashed
                    border-gray-200
                    text-gray-500
                "
            >
                No plan revenue available.
            </div>

        );

    }

    return (

        <div className="h-72 w-full">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 5,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="planName"
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        tickFormatter={(value) =>
                            `₹${Number(value).toLocaleString()}`
                        }
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value: number) => [
                            `₹${value.toLocaleString()}`,
                            "Revenue",
                        ]}
                    />

                    <Legend />

                    <Bar
                        dataKey="MONTHLY"
                        name="Monthly"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="YEARLY"
                        name="Yearly"
                        radius={[4, 4, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default PlanBreakdownChart;