import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Spinner
from "../../components/common/Spinner";



import { useInterview } from "../../../hooks/useInterview";
import InterviewOverviewCard from "../../components/interview/InterviewOverviewCard";
import InterviewGuidelines from "../../components/interview/InterviewGuidelines";
import MicrophonePermissionCard from "../../components/interview/MicrophonePermissionCard";
import InterviewTimerInfo from "../../components/interview/InterviewTimerInfo";

const InterviewPreparationPage: React.FC = () => {

    const { interviewId,} = useParams();

    const navigate = useNavigate();

    const {
        currentInterview,
        loading,
        starting,
        fetchInterview,
        beginInterview,
    } = useInterview();

    const [microphoneReady, setMicrophoneReady] = useState(false);

    useEffect(() => {

        if (interviewId) {

            fetchInterview(interviewId);

        }

    }, [interviewId, fetchInterview]);

    const estimatedMinutes =
        useMemo(() => {

            if (!currentInterview) {
                return 0;
            }

            return currentInterview.totalQuestions === 5
                ? 10
                : 20;

        }, [currentInterview]);

    const handleStart = async () => {

        if (!microphoneReady) {

            await Swal.fire({

                icon: "warning",

                title: "Microphone Required",

                text: "Please enable microphone before starting.",

            });

            return;
        }

        await beginInterview(interviewId!);

        navigate(`/interviews/${interviewId}/session`);
    };

    if (loading || !currentInterview) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <Spinner />

            </div>

        );
    }

    return (

        <div className="mx-auto max-w-5xl space-y-6">

            <Link
                to="/interviews"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >

                <ArrowLeft size={16} />

                Back To Interviews

            </Link>

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Interview Preparation
                </h1>

                <p className="mt-2 text-slate-500">
                    Complete the checks below before starting your AI interview.
                </p>

            </div>

            <InterviewOverviewCard
                title={currentInterview.title}
                topics={currentInterview.generatedFromTopics}
                totalQuestions={currentInterview.totalQuestions}
                estimatedMinutes={estimatedMinutes}
            />

            <InterviewGuidelines />

            <MicrophonePermissionCard
                onPermissionChange={
                    setMicrophoneReady
                }
            />

            <InterviewTimerInfo
                totalQuestions={
                    currentInterview.totalQuestions
                }
            />

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                <button
                    disabled={
                        !microphoneReady ||
                        starting
                    }
                    onClick={handleStart}
                    className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {starting
                        ? "Starting Interview..."
                        : "Start Interview"}

                </button>

            </div>

        </div>

    );

};

export default InterviewPreparationPage;