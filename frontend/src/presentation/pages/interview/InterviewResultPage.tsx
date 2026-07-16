import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams,} from "react-router-dom";
import Swal from "sweetalert2";
import { Award, ArrowLeft,} from "lucide-react";

import Spinner from "../../components/common/Spinner";
import InterviewReviewCard from "../../components/interview/InterviewReviewCard";
import { useInterview } from "../../../hooks/useInterview";

const InterviewResultPage: React.FC = () => {

    const { interviewId } = useParams();

    const navigate = useNavigate();

    const {

        loading,
        interviewResult,
        fetchInterviewResult,

    } = useInterview();

    useEffect(() => {

        if (!interviewId) {

            navigate("/interviews");

            return;

        }

        fetchInterviewResult(
            interviewId
        ).catch(async () => {

            await Swal.fire({

                icon: "error",

                title:
                    "Interview Result Not Found",

            });

            navigate("/interviews");

        });

    }, []);

    const performance = useMemo(() => {

        const score =
            interviewResult?.overallScore ?? 0;

        if (score >= 90)

            return {

                label:
                    "Excellent",

                color:
                    "text-emerald-600",

                message:
                    "Outstanding performance. You demonstrated excellent understanding and communication.",

            };

        if (score >= 80)

            return {

                label:
                    "Very Good",

                color:
                    "text-green-600",

                message:
                    "Strong performance. Minor improvements can make your answers even better.",

            };

        if (score >= 70)

            return {

                label:
                    "Good",

                color:
                    "text-amber-600",

                message:
                    "Good understanding. Practice giving more detailed explanations.",

            };

        if (score >= 60)

            return {

                label:
                    "Needs Practice",

                color:
                    "text-orange-600",

                message:
                    "Fair performance. Review key concepts and improve answer structure.",

            };

        return {

            label:
                "Keep Practicing",

            color:
                "text-red-600",

            message:
                "Revisit your learning material and practice explaining concepts aloud.",

        };

    }, [
        interviewResult,
    ]);

    if (
        loading ||
        !interviewResult
    ) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <Spinner />

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-7xl space-y-8">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-900">

                        Interview Result

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Review your interview performance and AI feedback.

                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/interviews"
                        )
                    }
                    className="flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >

                    <ArrowLeft size={18} />

                    Back to Interviews

                </button>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                    <div className="flex items-center gap-3">

                        <Award className="text-red-600" />

                        <h2 className="text-lg font-bold text-slate-900">

                            Overall Score

                        </h2>

                    </div>

                    <div className="mt-6 text-5xl font-bold text-red-600">

                        {interviewResult.overallScore}

                    </div>

                    <div
                        className={`mt-3 text-xl font-semibold ${performance.color}`}
                    >
                        {performance.label}
                    </div>

                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">

                    <h2 className="text-lg font-bold text-slate-900">

                        Interview Summary

                    </h2>

                    <p className="mt-4 leading-8 text-slate-600">

                        {performance.message}

                    </p>

                    <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                        <div className="text-sm text-slate-500">

                            Questions Reviewed

                        </div>

                        <div className="text-3xl font-bold text-slate-900">

                            {interviewResult.totalQuestions}

                        </div>

                    </div>

                </div>

            </div>

            <div className="space-y-6">

                {interviewResult.review.map(

                    (
                        item,
                        index
                    ) => (

                        <InterviewReviewCard
                            key={index}
                            review={item}
                        />

                    )

                )}

            </div>

        </div>

    );

};

export default InterviewResultPage;