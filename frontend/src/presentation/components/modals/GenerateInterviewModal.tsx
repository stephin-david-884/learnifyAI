import React, { useMemo, useState } from 'react';
import type { DocumentTopic } from '../../../types/document';
import type { GenerateInterviewResponse } from '../../../types/interview';
import Swal from 'sweetalert2';
import { Mic, X } from 'lucide-react';

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

    const [questionCount, setQuestionCount] = useState<5 | 10>(5);

    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const maxTopics = TOPIC_LIMITS[questionCount];

    const remaining = maxTopics - selectedTopics.length;

    const canGenerate = useMemo(() => title.trim().length > 0 && selectedTopics.length >= 2, [title, selectedTopics]);

    if (!open) return null;

    const toggleTopic = (topicName: string) => {

        const exists = selectedTopics.includes(topicName);

        if (exists) {
            setSelectedTopics(prev => prev.filter(t => t !== topicName));
            return;
        }

        if (selectedTopics.length >= maxTopics) {
            return;
        }

        setSelectedTopics(prev => [...prev, topicName,]);
    };

    const handleGenerate =
        async () => {

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

                topics:
                    selectedTopics,
            });

            onClose();
        };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                            <Mic className="text-red-600" />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-slate-900">

                                Generate Interview

                            </h2>

                            <p className="text-sm text-slate-500">

                                AI voice interview from selected topics.

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

                            Interview Title

                        </label>

                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
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
                                    Number(e.target.value) as 5 | 10
                                )
                            }
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
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

                        <div className="mb-2 flex justify-between">

                            <span className="text-sm font-medium">

                                Select Topics

                            </span>

                            <span className="text-xs text-slate-500">

                                {remaining} remaining

                            </span>

                        </div>

                        <div className="max-h-64 overflow-y-auto">

                            <div className="grid gap-3 sm:grid-cols-2">

                                {topics.map(topic => {

                                    const active =
                                        selectedTopics.includes(topic.name);

                                    return (

                                        <button
                                            key={topic.name}
                                            onClick={() =>
                                                toggleTopic(topic.name)
                                            }
                                            type="button"
                                            className={`rounded-xl border p-3 text-left transition ${active
                                                    ? "border-red-500 bg-red-50 text-red-700"
                                                    : "border-slate-200 hover:border-red-300"
                                                }`}
                                        >

                                            <div className="font-medium text-sm">

                                                {topic.name}

                                            </div>

                                            <div className="text-xs text-slate-500 mt-1">

                                                Score {topic.score}

                                            </div>

                                        </button>

                                    )

                                })}

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-red-100 bg-red-50 p-4">

                        <div className="font-semibold text-red-700">

                            Credit Cost

                        </div>

                        <div className="text-sm text-red-600 mt-1">

                            {questionCount === 5
                                ? "10 Credits"
                                : "20 Credits"}

                        </div>

                    </div>

                    <button
                        disabled={!canGenerate || loading}
                        onClick={handleGenerate}
                        className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-semibold text-white"
                    >

                        {loading
                            ? "Generating..."
                            : "Generate Interview"}

                    </button>

                </div>

            </div>

        </div>

    )
}

export default GenerateInterviewModal
