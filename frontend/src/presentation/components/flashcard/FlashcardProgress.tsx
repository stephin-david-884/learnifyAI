import React from "react";
import { BookOpen } from "lucide-react";

type Props = {
    topic: string;
    current: number;
    total: number;
};

const FlashcardProgress: React.FC<Props> = ({
    topic,
    current,
    total,
}) => {

    const percentage = total === 0 ? 0 : Math.round((current / total) * 100);

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                        <BookOpen className="text-blue-600" size={24}/>

                    </div>

                    <div>

                        <p className="text-sm font-medium text-slate-500">

                            Studying Topic

                        </p>

                        <h2 className="text-xl font-bold text-slate-900">

                            {topic}

                        </h2>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-500">

                        Card Progress

                    </p>

                    <p className="text-lg font-bold text-slate-900">

                        {current} / {total}

                    </p>

                </div>

            </div>

            <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-slate-600">

                        Progress

                    </span>

                    <span className="text-sm font-semibold text-blue-600">

                        {percentage}%

                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

            </div>

        </div>

    );

};

export default FlashcardProgress;