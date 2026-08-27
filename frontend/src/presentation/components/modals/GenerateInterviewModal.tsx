import React, { useMemo, useState } from "react";
import type { DocumentTopic } from "../../../types/document";
import type { GenerateInterviewResponse } from "../../../types/interview";
import Swal from "sweetalert2";
import { Mic, X } from "lucide-react";

type Props = {
    open: boolean;

    documentTitle: string;

    topics: DocumentTopic[];

    loading?: boolean;

    onClose: () => void;

    onGenerate: (data: {
        title: string;
        questionCount: 5 | 10;
        topics: string[];
    }) => Promise<GenerateInterviewResponse>;
};

// const QUESTION_OPTIONS = [5, 10] as const;

const TOPIC_LIMITS: Record<5 | 10, number> = {
    5: 3,
    10: 5,
};

const GenerateInterviewModal: React.FC<Props> = ({
    open,
    documentTitle,
    topics,
    loading = false,
    onClose,
    onGenerate,
}) => {
    const [title, setTitle] = useState(`${documentTitle} Interview`);

    const [questionCount, setQuestionCount] =
        useState<5 | 10>(5);

    const [selectedTopics, setSelectedTopics] =
        useState<string[]>([]);

    const maxTopics = TOPIC_LIMITS[questionCount];

    const remaining = maxTopics - selectedTopics.length;

    const canGenerate = useMemo(
        () =>
            title.trim().length > 0 &&
            selectedTopics.length >= 2,
        [title, selectedTopics]
    );

    if (!open) return null;

    const toggleTopic = (topicName: string) => {
        const exists = selectedTopics.includes(topicName);

        if (exists) {
            setSelectedTopics((prev) =>
                prev.filter((t) => t !== topicName)
            );
            return;
        }

        if (selectedTopics.length >= maxTopics) {
            return;
        }

        setSelectedTopics((prev) => [
            ...prev,
            topicName,
        ]);
    };

    const handleGenerate = async () => {
        if (title.trim().length < 3) {
            await Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Interview title is required.",
            });

            return;
        }

        if (selectedTopics.length < 2) {
            await Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Please select at least 2 topics.",
            });

            return;
        }

        await onGenerate({
            title,
            questionCount,
            topics: selectedTopics,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-4">
            <div className="flex min-h-full items-center justify-center py-4 sm:py-6">
                <div className="flex w-full max-w-2xl max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl">

                    {/* Header */}
                    <div className="flex shrink-0 items-start justify-between border-b border-slate-100 p-4 sm:items-center sm:p-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 sm:h-12 sm:w-12 sm:rounded-2xl">
                                <Mic className="h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
                                    Generate Interview
                                </h2>

                                <p className="text-xs text-slate-500 sm:text-sm">
                                    AI voice interview from selected topics.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-3 shrink-0"
                        >
                            <X className="h-5 w-5 text-slate-500 sm:h-6 sm:w-6" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        <div className="space-y-5 sm:space-y-6">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Interview Title
                                </label>

                                <input
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 sm:rounded-2xl"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Number of Questions
                                </label>

                                <select
                                    value={questionCount}
                                    onChange={(e) =>
                                        setQuestionCount(
                                            Number(
                                                e.target.value
                                            ) as 5 | 10
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 sm:rounded-2xl"
                                >
                                    <option value={5}>
                                        5 Questions
                                    </option>

                                    <option value={10}>
                                        10 Questions
                                    </option>
                                </select>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="text-sm font-medium">
                                        Select Topics
                                    </span>

                                    <span className="shrink-0 text-xs text-slate-500">
                                        {remaining} remaining
                                    </span>
                                </div>

                                <div className="max-h-52 overflow-y-auto pr-1 sm:max-h-64 sm:pr-2">
                                    <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                                        {topics.map((topic) => {
                                            const active =
                                                selectedTopics.includes(
                                                    topic.name
                                                );

                                            return (
                                                <button
                                                    key={topic.name}
                                                    onClick={() =>
                                                        toggleTopic(
                                                            topic.name
                                                        )
                                                    }
                                                    type="button"
                                                    className={`rounded-xl border p-3 text-left transition ${active
                                                            ? "border-red-500 bg-red-50 text-red-700"
                                                            : "border-slate-200 hover:border-red-300"
                                                        }`}
                                                >
                                                    <div className="break-words text-sm font-medium">
                                                        {topic.name}
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        Score {topic.score}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-red-100 bg-red-50 p-4 sm:rounded-2xl">
                                <div className="font-semibold text-red-700">
                                    Credit Cost
                                </div>

                                <div className="mt-1 text-sm text-red-600">
                                    {questionCount === 5
                                        ? "10 Credits"
                                        : "20 Credits"}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Sticky Bottom Action */}
                    <div className="shrink-0 border-t border-slate-100 bg-white p-4 sm:p-6">
                        <button
                            disabled={!canGenerate || loading}
                            onClick={handleGenerate}
                            className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-semibold text-white disabled:opacity-50 sm:rounded-2xl"
                        >
                            {loading
                                ? "Generating..."
                                : "Generate Interview"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GenerateInterviewModal;