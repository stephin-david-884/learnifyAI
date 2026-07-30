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
import type { BillingCycleBreakdown } from "../../../../../types/admin/analytics";


interface BillingCycleChartProps {
    data: BillingCycleBreakdown[];
    loading?: boolean;
}

const COLORS = [
    "#2563eb",
    "#16a34a",
];

const BillingCycleChart = ({
    data,
    loading = false,
}: BillingCycleChartProps) => {

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
                No billing cycle data available.
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
                        dataKey="billingCycle"
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
                        labelFormatter={(label) =>
                            `Billing Cycle: ${label}`
                        }
                    />

                    <Bar
                        dataKey="revenue"
                        radius={[6, 6, 0, 0]}
                        name="Revenue"
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

export default BillingCycleChart;