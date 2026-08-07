import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { RevenueTrend } from "../../../../../types/admin/analytics";

interface RevenueTrendChartProps {
    data: RevenueTrend[];
    loading?: boolean;
}

const RevenueTrendChart = ({
    data,
    loading = false,
}: RevenueTrendChartProps) => {

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
                No revenue data available.
            </div>

        );

    }

    return (

        <div className="h-72 w-full">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 0,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="date"
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        tick={{
                            fontSize: 12,
                        }}
                        tickFormatter={(value) =>
                            `₹${Number(value).toLocaleString()}`
                        }
                    />

                    <Tooltip
                        formatter={(value) => [
                            Number(value ?? 0).toLocaleString(),
                            "Revenue",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default RevenueTrendChart;