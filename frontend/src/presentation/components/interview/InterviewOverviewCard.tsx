import React from "react";
import { Brain, ClipboardList, Clock3 } from "lucide-react";

type Props = {

    title: string;
    topics: string[];
    totalQuestions: number;
    estimatedMinutes: number;
};

const InterviewOverviewCard: React.FC<Props> = ({

    title,
    topics,
    totalQuestions,
    estimatedMinutes,

}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                    <Brain className="text-red-600" />

                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        {title}

                    </h2>

                    <p className="text-sm text-slate-500">

                        AI Technical Interview

                    </p>

                </div>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-slate-600">

                        <ClipboardList size={18} />

                        Questions

                    </div>

                    <div className="mt-2 text-3xl font-bold">

                        {totalQuestions}

                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-slate-600">

                        <Clock3 size={18} />

                        Estimated Time

                    </div>

                    <div className="mt-2 text-3xl font-bold">

                        {estimatedMinutes} min

                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                    <div className="text-slate-600">

                        Topics

                    </div>

                    <div className="mt-2 text-3xl font-bold">

                        {topics.length}

                    </div>

                </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

                {topics.map(topic => (

                    <span
                        key={topic}
                        className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                    >

                        {topic}

                    </span>

                ))}

            </div>

        </div>

    );

};

export default InterviewOverviewCard;