import React, { useMemo, useState } from "react";
import { X, ClipboardList } from "lucide-react";
import type { DocumentTopic } from "../../../types/document";
import type { GenerateQuizResponse } from "../../../types/quiz";
import { validateQuizGeneration } from "../../../lib/validation/quizValidation";
import Swal from "sweetalert2";

type Props = {
    open: boolean;

    documentTitle: string;

    topics: DocumentTopic[];

    loading?: boolean;

    onClose: () => void;

    onGenerate: (data: {
        title: string;
        questionCount: number;
        topics: string[];
    }) => Promise<GenerateQuizResponse>;
};

const QUESTION_OPTIONS = [7, 10, 12, 15];

const TOPIC_LIMITS: Record<number, number> = {
    7: 3,
    10: 5,
    12: 6,
    15: 8,
};

const GenerateQuizModal: React.FC<Props> = ({
    open,
    documentTitle,
    topics,
    loading = false,
    onClose,
    onGenerate,
}) => {

    const [title, setTitle] = useState(`${documentTitle} Quiz`);

    const [questionCount, setQuestionCount] =
        useState<number>(7);

    const [selectedTopics, setSelectedTopics] =
        useState<string[]>([]);

    const maxTopics =
        TOPIC_LIMITS[questionCount];

    const remaining =
        maxTopics - selectedTopics.length;

    const canGenerate = useMemo(() => {
        return (
            title.trim().length > 0 &&
            selectedTopics.length > 0
        );
    }, [title, selectedTopics]);

    if (!open) return null;

    const toggleTopic = (topicName: string) => {

        const exists =
            selectedTopics.includes(topicName);

        if (exists) {
            setSelectedTopics(prev =>
                prev.filter(t => t !== topicName)
            );

            return;
        }

        if (selectedTopics.length >= maxTopics) {
            return;
        }

        setSelectedTopics(prev => [
            ...prev,
            topicName,
        ]);
    };

    const handleGenerate = async () => {

        const error =
        validateQuizGeneration(
            title,
            selectedTopics,
            questionCount
        );

    if (error) {

        await Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: error,
        });

        return;
    }

        if (!canGenerate) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                            <ClipboardList className="text-red-600" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Generate Quiz
                            </h2>

                            <p className="text-sm text-slate-500">
                                Create a quiz from selected topics.
                            </p>
                        </div>
                    </div>

                    <button onClick={onClose}>
                        <X className="h-6 w-6 text-slate-500" />
                    </button>
                </div>

                <div className="mt-6 space-y-6">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Quiz Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                        />
                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Question Count
                        </label>

                        <select
                            value={questionCount}
                            onChange={(e) =>
                                setQuestionCount(
                                    Number(e.target.value)
                                )
                            }
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                        >
                            {QUESTION_OPTIONS.map(
                                (count) => (
                                    <option
                                        key={count}
                                        value={count}
                                    >
                                        {count} Questions
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <label className="text-sm font-medium text-slate-700">
                                Select Topics
                            </label>

                            <span className="text-xs text-slate-500">
                                {remaining} remaining
                            </span>
                        </div>
                        <div className="max-h-64 overflow-y-auto pr-2">    
                        <div className="grid gap-3 sm:grid-cols-2">

                            {topics.map((topic) => {

                                const active =
                                    selectedTopics.includes(
                                        topic.name
                                    );

                                return (
                                    <button
                                        key={topic.name}
                                        type="button"
                                        onClick={() =>
                                            toggleTopic(topic.name)
                                        }
                                        className={`
                                            rounded-xl border p-2.5 text-left transition
                                            
                                            ${active
                                                ? "border-red-500 bg-red-50 text-red-700"
                                                : "border-slate-200 bg-white hover:border-red-300"}
                                        `}
                                    >
                                        <div className="font-medium text-sm">
                                            {topic.name}
                                        </div>

                                        <div className="mt-1 text-[11px] text-slate-500">
                                            Importance Score: {topic.score}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-red-100 bg-red-50 p-4">

                        <div className="text-sm font-semibold text-red-700">
                            Quiz Generation Cost
                        </div>

                        <div className="mt-1 text-sm text-red-600">
                            10 Credits will be deducted.
                        </div>
                    </div>

                    <button
                        disabled={!canGenerate || loading}
                        onClick={handleGenerate}
                        className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Quiz"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default GenerateQuizModal;