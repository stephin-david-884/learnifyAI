import { ArrowDown, ArrowUp, type LucideIcon, Minus } from "lucide-react";

interface AnalyticsCardProps {

    title: string;

    value: string | number;

    icon?: LucideIcon;

    subtitle?: string;

    trend?: number;

    loading?: boolean;

}

const AnalyticsCard = ({
    title,
    value,
    icon: Icon,
    subtitle,
    trend,
    loading = false,
}: AnalyticsCardProps) => {

    const renderTrend = () => {

        if (trend === undefined) return null;

        if (trend > 0) {

            return (
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <ArrowUp size={16} />
                    {trend}%
                </span>
            );

        }

        if (trend < 0) {

            return (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <ArrowDown size={16} />
                    {Math.abs(trend)}%
                </span>
            );

        }

        return (
            <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <Minus size={16} />
                0%
            </span>
        );

    };

    if (loading) {

        return (

            <div className="rounded-xl border bg-white p-5 shadow-sm animate-pulse">

                <div className="flex items-center justify-between">

                    <div className="space-y-3">

                        <div className="h-4 w-24 rounded bg-gray-200" />

                        <div className="h-8 w-32 rounded bg-gray-200" />

                        <div className="h-3 w-20 rounded bg-gray-200" />

                    </div>

                    <div className="h-12 w-12 rounded-lg bg-gray-200" />

                </div>

            </div>

        );

    }

    return (

        <div
            className="
                rounded-xl
                border
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
            "
        >

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">

                        {title}

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-900">

                        {value}

                    </h3>

                    {subtitle && (

                        <p className="mt-1 text-sm text-gray-500">

                            {subtitle}

                        </p>

                    )}

                </div>

                <div
                    className="
                        rounded-lg
                        bg-blue-50
                        p-3
                        text-blue-600
                    "
                >

                    {Icon && <Icon size={24} />}

                </div>

            </div>

            {trend !== undefined && (

                <div className="mt-4">

                    {renderTrend()}

                </div>

            )}

        </div>

    );

};

export default AnalyticsCard;