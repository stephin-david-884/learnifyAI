import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { FeatureUsage } from "../../../../../types/admin/analytics";

interface FeatureUsageChartProps {

    data: FeatureUsage[];

    loading?: boolean;

}

const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
];

const FeatureUsageChart = ({
    data,
    loading = false,
}: FeatureUsageChartProps) => {

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

    if (!data.length) {

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
                No feature usage data available.
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
                    data={data}
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
                        dataKey="feature"
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value: number) => [
                            value.toLocaleString(),
                            "Requests",
                        ]}
                        labelFormatter={(label) =>
                            `Feature: ${label}`
                        }
                    />

                    <Bar
                        dataKey="requests"
                        name="Requests"
                        radius={[6, 6, 0, 0]}
                    >

                        {data.map((_, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default FeatureUsageChart;