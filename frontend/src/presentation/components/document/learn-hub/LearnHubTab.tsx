import React, { useState } from "react";
import {
    ClipboardList,
    Sparkles,
    BookOpen,
    Mic,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import GenerateQuizModal
    from "../../modals/GenerateQuizModal";

import { useQuiz }
    from "../../../../hooks/useQuiz";

import type {
    DocumentItem,
} from "../../../../types/document";
import { useInterview } from "../../../../hooks/useInterview";
import { useSubscription } from "../../../../hooks/useSubscription";
import GenerateInterviewModal from "../../modals/GenerateInterviewModal";

type Props = {
    document: DocumentItem;
};

const LearnHubTab: React.FC<Props> = ({
    document,
}) => {

    const navigate =
        useNavigate();

    const { createQuiz, generating } = useQuiz();

    const { createInterview, generating: interviewGenerating } = useInterview();

    const { activeSubscription } = useSubscription();

    const hasInterviewAccess = activeSubscription?.planSnapshot?.features?.interviewAccess;

    const [interviewModal, setInterviewModal] = useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const handleGenerateQuiz = async (
        data: {
            title: string;
            questionCount: number;
            topics: string[];
        }
    ) => {

        const result =
            await createQuiz({
                documentId: document.id,
                title: data.title,
                topics: data.topics,
                questionCount:
                    data.questionCount,
            });

        navigate("/quizzes");

        return result;
    };

    const handleGenerateInterview =
        async (data: {
            title: string;
            questionCount: 5 | 10;
            topics: string[];
        }) => {

            const result =
                await createInterview({

                    documentId:
                        document.id,

                    title:
                        data.title,

                    topics:
                        data.topics,

                    questionCount:
                        data.questionCount,

                });

            navigate("/interviews");

            return result;
        };

    return (
        <>
            <div className="space-y-6">


                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                            <Sparkles
                                className="text-red-600"
                            />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                Learn Hub
                            </h2>

                            <p className="text-sm text-slate-500">
                                Generate AI powered quizzes
                                from your document topics.
                            </p>

                        </div>

                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                    <div className="mb-5 flex items-center gap-2">

                        <BookOpen
                            size={20}
                            className="text-red-600"
                        />

                        <h3 className="font-semibold text-slate-900">
                            Available Topics
                        </h3>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        {document.topics.map(
                            (topic) => (

                                <div
                                    key={topic.name}
                                    className="rounded-2xl border border-red-100 bg-red-50 px-4 py-2"
                                >
                                    <div className="font-medium text-red-700">
                                        {topic.name}
                                    </div>

                                    <div className="text-xs text-red-500">
                                        Score: {topic.score}
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <ClipboardList
                                    size={20}
                                    className="text-red-600"
                                />

                                <h3 className="font-semibold text-slate-900">
                                    AI Quiz Generator
                                </h3>

                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                                Generate MCQ quizzes from selected topics.
                                Each quiz costs 10 credits.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setOpenModal(true)
                            }
                            className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition  hover:opacity-90"
                        >
                            Generate Quiz
                        </button>

                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <Mic
                                    size={20}
                                    className="text-red-600"
                                />

                                <h3 className="font-semibold">

                                    AI Interview

                                </h3>

                            </div>

                            <p className="mt-2 text-sm text-slate-500">

                                Practice AI mock interviews using your document topics.
                                Voice responses will be evaluated with detailed feedback.

                            </p>

                        </div>

                        {hasInterviewAccess ? (

                            <button
                                onClick={() =>
                                    setInterviewModal(true)
                                }
                                className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 hover:opacity-90"
                            >

                                Generate Interview

                            </button>

                        ) : (

                            <div className="rounded-2xl bg-amber-50 px-5 py-3 text-sm font-medium text-amber-700">

                                Available on Pro Plan

                            </div>

                        )}

                    </div>

                </div>
            </div>

            <GenerateQuizModal
                open={openModal}
                documentTitle={document.title}
                topics={document.topics}
                loading={generating}
                onClose={() =>
                    setOpenModal(false)
                }
                onGenerate={
                    handleGenerateQuiz
                }
            />

            <GenerateInterviewModal
                open={interviewModal}

                documentTitle={document.title}

                topics={document.topics}

                loading={interviewGenerating}

                onClose={() =>
                    setInterviewModal(false)
                }

                onGenerate={handleGenerateInterview}
            />
        </>
    );
};

export default LearnHubTab;