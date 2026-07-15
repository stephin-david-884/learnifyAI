import React from "react";

import { Mic, ArrowRight, CheckCircle, Clock3 } from "lucide-react";

import {useNavigate,} from "react-router-dom";

import type {InterviewListItem} from "../../../types/interview";

type Props = {
    interview: InterviewListItem;
};

const InterviewCard: React.FC<Props> = ({
    interview,
}) => {

    const navigate = useNavigate();

    const handleClick = () => {

        if (interview.status ==="COMPLETED") {

            navigate(
                `/interviews/${interview.id}/result`
            );

            return;
        }

        navigate(`/interviews/${interview.id}`);
    };

    return (

        <div
            className="rounded-3xl border border-slate-200 bg-whit p-6 transition hover:border-red-200 hover:shadow-lg"
        >

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                        <Mic className="text-red-600"/>

                    </div>

                    <div>

                        <h3 className="font-bold text-slate-900">

                            {interview.title}

                        </h3>

                        <p className="text-sm text-slate-500">

                            {interview.totalQuestions} Questions

                        </p>

                    </div>

                </div>

                {interview.status === "COMPLETED" ? (

                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">

                        <CheckCircle size={16}/>

                        Completed

                    </div>

                ) : (

                    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1 text-sm font-medium text-amber-600">

                        <Clock3 size={16}/>

                        Ready

                    </div>

                )}

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

                {interview.generatedFromTopics
                    .slice(0,4)
                    .map(topic=>(

                        <span
                            key={topic}
                            className="rounded-xl bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                        >

                            {topic}

                        </span>

                    ))}

            </div>

            {interview.status === "COMPLETED" && (

                <div className="mt-4 rounded-2xl bg-slate-50 p-3">

                    <div className="text-sm text-slate-500">

                        Overall Score

                    </div>

                    <div className="text-xl font-bold text-slate-900">

                        {interview.overallScore}%

                    </div>

                </div>

            )}

            <button
                onClick={handleClick}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 font-semibold text-white"
            >

                {interview.status === "COMPLETED"

                    ? "View Result"

                    : "Start Interview"}

                <ArrowRight size={18}/>

            </button>

        </div>

    );

};

export default InterviewCard;