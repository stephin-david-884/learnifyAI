import React from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: LucideIcon;
    color: string;
};

const StatsCard: React.FC<Props> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
}) => {

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h3>

                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
                >
                    <Icon className="h-7 w-7 text-white" />
                </div>

            </div>

        </div>
    );
};

export default StatsCard;