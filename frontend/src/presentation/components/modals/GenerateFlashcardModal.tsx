import React, { useMemo, useState } from "react";
import { BookOpen, X } from "lucide-react";
import Swal from "sweetalert2";
import type { DocumentTopic } from "../../../types/document";
import type { GenerateFlashcardResponse } from "../../../types/flashcard";

type Props = {
    open: boolean;

    topics: DocumentTopic[];

    loading?: boolean;

    onClose: () => void;

    onGenerate: (data: {
        topic: string;
        cardCount: 5 | 10;
    }) => Promise<GenerateFlashcardResponse>;
};

const GenerateFlashcardModal: React.FC<Props> = ({
    open,
    topics,
    loading = false,
    onClose,
    onGenerate,
}) => {

    const [selectedTopic, setSelectedTopic] = useState("");

    const [cardCount, setCardCount] = useState<5 | 10>(5);

    const creditsRequired = cardCount;

    const canGenerate =
        useMemo(() => {

            return (
                selectedTopic.trim().length > 0
            );

        }, [selectedTopic]);

    if (!open) {
        return null;
    }

    const handleGenerate = async () => {

        if (!selectedTopic) {

            await Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Please select a topic.",
            });

            return;
        }

        await onGenerate({
            topic: selectedTopic,
            cardCount,
        });

        onClose();
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                            <BookOpen className="text-blue-600" />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-slate-900">

                                Generate Flashcards

                            </h2>

                            <p className="text-sm text-slate-500">

                                Create AI-powered flashcards from one topic.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                    >
                        <X className="h-6 w-6 text-slate-500" />
                    </button>

                </div>

                {/* Body */}

                <div className="mt-6 space-y-6">

                    {/* Topics */}

                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <label className="text-sm font-medium text-slate-700">

                                Select Topic

                            </label>

                            <span className="text-xs text-slate-500">

                                Choose one topic

                            </span>

                        </div>

                        <div className="max-h-64 overflow-y-auto pr-2">

                            <div className="grid gap-3 sm:grid-cols-2">

                                {topics.map((topic) => {

                                    const active =
                                        selectedTopic === topic.name;

                                    return (

                                        <button
                                            key={topic.name}
                                            type="button"
                                            onClick={() =>
                                                setSelectedTopic(
                                                    topic.name
                                                )
                                            }
                                            className={`
                                                rounded-xl border p-3 text-left transition

                                                ${active
                                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                                    : "border-slate-200 bg-white hover:border-blue-300"
                                                }
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

                    {/* Card Count */}

                    <div>

                        <label className="mb-3 block text-sm font-medium text-slate-700">

                            Number of Flashcards

                        </label>

                        <div className="grid grid-cols-2 gap-4">

                            {[5, 10].map((count) => {

                                const active =
                                    cardCount === count;

                                return (

                                    <button
                                        key={count}
                                        type="button"
                                        onClick={() =>
                                            setCardCount(
                                                count as 5 | 10
                                            )
                                        }
                                        className={`
                                            rounded-2xl border p-4 transition

                                            ${active
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-slate-200 hover:border-blue-300"
                                            }
                                        `}
                                    >

                                        <div className="text-xl font-bold">

                                            {count}

                                        </div>

                                        <div className="mt-1 text-sm text-slate-500">

                                            Flashcards

                                        </div>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                    {/* Credit Box */}

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <div className="text-sm font-semibold text-blue-700">

                            Generation Cost

                        </div>

                        <div className="mt-1 text-sm text-blue-600">

                            {creditsRequired} Credits will be deducted.

                        </div>

                    </div>

                    {/* Generate */}

                    <button
                        disabled={
                            !canGenerate ||
                            loading
                        }
                        onClick={handleGenerate}
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >

                        {loading
                            ? "Generating..."
                            : "Generate Flashcards"}

                    </button>

                </div>

            </div>

        </div>

    );
};

export default GenerateFlashcardModal;