import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { ProviderUsage } from "../../../../../types/admin/analytics";

interface ProviderUsageChartProps {

    data: ProviderUsage[];

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

const ProviderUsageChart = ({
    data,
    loading = false,
}: ProviderUsageChartProps) => {

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
                    text-gray-500"
            >
                No provider usage data available.
            </div>

        );

    }

    return (

        <div className="h-72 w-full">

            < ResponsiveContainer
                width="100%"
                height="100%"
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="requests"
                        nameKey="provider"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                    >

                        {data.map((_, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        formatter={(value: number) => [
                            value.toLocaleString(),
                            "Requests",
                        ]}
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer >

        </div >

    );

};

export default ProviderUsageChart;