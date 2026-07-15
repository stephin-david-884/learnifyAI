import React from "react";
import { Timer } from "lucide-react";

type Props = {
    remainingSeconds: number;
    totalSeconds: number;
};

const InterviewTimer: React.FC<Props> = ({
    remainingSeconds,
    totalSeconds,
}) => {

    const percentage =(remainingSeconds / totalSeconds) * 100;

    const colorClass =
        percentage > 50
            ? "text-emerald-600"

            : percentage > 25
                ? "text-amber-600"

                : "text-red-600";

    const bgClass =
        percentage > 50
            ? "bg-emerald-50"

            : percentage > 25
                ? "bg-amber-50"

                : "bg-red-50";

    const borderClass =
        percentage > 50
            ? "border-emerald-200"

            : percentage > 25
                ? "border-amber-200"

                : "border-red-200";

    const minutes = Math.floor(remainingSeconds / 60);

    const seconds = remainingSeconds % 60;

    const formatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return (

        <div className={`rounded-3xl border ${borderClass} ${bgClass} p-6`}>

            <div className="flex items-center gap-4">

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white ${colorClass}`}>

                    <Timer size={30} />

                </div>

                <div>

                    <p className="text-sm text-slate-500">
                        Time Remaining
                    </p>

                    <h2
                        className={`
                            mt-1
                            text-3xl
                            font-bold
                            ${colorClass}
                        `}
                    >
                        {formatted}
                    </h2>

                </div>

            </div>

            <div className="mt-6">

                <div
                    className="
                        h-3
                        overflow-hidden
                        rounded-full
                        bg-white
                    "
                >

                    <div
                        className={`
                            h-full
                            transition-all
                            duration-1000

                            ${percentage > 50
                                ? "bg-emerald-500"

                                : percentage > 25
                                    ? "bg-amber-500"

                                    : "bg-red-500"}
                        `}
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">

                The interview will automatically submit when
                the timer reaches zero.

            </p>

        </div>

    );

};

export default InterviewTimer;