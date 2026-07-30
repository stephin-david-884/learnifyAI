import { RefreshCw } from "lucide-react";
import type { AnalyticsFilter } from "../../../../../types/admin/analytics";

interface AnalyticsFilterBarProps {
    filter: AnalyticsFilter;
    refreshing?: boolean;
    onFilterChange: (filter: AnalyticsFilter) => void;
    onRefresh: () => void;
}

const PERIOD_OPTIONS = [
    {
        label: "Last 7 Days",
        value: "LAST_7_DAYS",
    },
    {
        label: "Last 30 Days",
        value: "LAST_30_DAYS",
    },
    {
        label: "Last 90 Days",
        value: "LAST_90_DAYS",
    },
    {
        label: "This Month",
        value: "THIS_MONTH",
    },
] as const;

const AnalyticsFilterBar = ({
    filter,
    refreshing = false,
    onFilterChange,
    onRefresh,
}: AnalyticsFilterBarProps) => {
    const handlePeriodChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        onFilterChange({
            ...filter,
            period: event.target.value as AnalyticsFilter["period"],
        });
    };

    return (
        <div
            className="
                mb-6
                flex
                flex-col
                gap-4
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                md:flex-row
                md:items-center
                md:justify-between
            "
        >
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="analytics-period"
                    className="
                        text-sm
                        font-medium
                        text-gray-700
                    "
                >
                    Period
                </label>

                <select
                    id="analytics-period"
                    value={filter.period}
                    onChange={handlePeriodChange}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        outline-none
                        transition-colors
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        md:w-56
                    "
                >
                    {PERIOD_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={refreshing}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition-all
                        duration-200
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    <RefreshCw
                        size={18}
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {refreshing ? "Refreshing..." : "Refresh"}
                </button>
            </div>
        </div>
    );
};

export default AnalyticsFilterBar;