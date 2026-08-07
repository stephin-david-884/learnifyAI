import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { DocumentStatusBreakdown } from "../../../../../types/admin/analytics";

interface StatusBreakdownChartProps {

    data: DocumentStatusBreakdown[];

    loading?: boolean;

}

const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
];

const StatusBreakdownChart = ({
    data,
    loading = false,
}: StatusBreakdownChartProps) => {

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
                No document status data available.
            </div>

        );

    }

    return (

        <div className="h-72 w-full">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="totalDocuments"
                        nameKey="status"
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
                        formatter={(value) => [
                            Number(value ?? 0).toLocaleString(),
                            "Documents",
                        ]}
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default StatusBreakdownChart;