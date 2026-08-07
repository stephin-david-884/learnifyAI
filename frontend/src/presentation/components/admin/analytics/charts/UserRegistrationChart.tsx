import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { UserRegistrationTrend } from "../../../../../types/admin/analytics";

interface UserRegistrationChartProps {

    data: UserRegistrationTrend[];

    loading?: boolean;

}

const UserRegistrationChart = ({
    data,
    loading = false,
}: UserRegistrationChartProps) => {

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
                No user registration data available.
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
                        bottom: 5,
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
                        allowDecimals={false}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            Number(value ?? 0).toLocaleString(),
                            "Registrations",
                        ]}
                        labelFormatter={(label) =>
                            `Date: ${label}`
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="registrations"
                        name="Registrations"
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

export default UserRegistrationChart;