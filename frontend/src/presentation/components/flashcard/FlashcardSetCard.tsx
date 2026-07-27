import React from "react";

import { BookOpen, Layers3, CalendarDays, Trash2, ArrowRight } from "lucide-react";

import type {
    FlashcardDifficulty,
    FlashcardSetListItem,
} from "../../../types/flashcard";

type Props = {
    flashcardSet: FlashcardSetListItem;

    deleting?: boolean;

    onStudy: (flashcardSetId: string) => void;

    onDelete: (flashcardSetId: string) => void;
};

const difficultyColor = (
    difficulty: FlashcardDifficulty
) => {

    switch (difficulty) {

        case "EASY":
            return "bg-emerald-100 text-emerald-700";

        case "MEDIUM":
            return "bg-amber-100 text-amber-700";

        case "HARD":
            return "bg-red-100 text-red-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
};

const FlashcardSetCard: React.FC<Props> = ({
    flashcardSet,
    deleting = false,
    onStudy,
    onDelete,
}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">


            <div className="flex items-start justify-between">

                <div className="flex gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">

                        <BookOpen className="text-blue-600" size={28}/>

                    </div>

                    <div>

                        <h3 className="text-lg font-bold text-slate-900">
                            {flashcardSet.topic}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Study deck generated with AI
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">

                <div className="rounded-2xl bg-slate-50 p-4">

                    <Layers3 className="text-blue-600" size={18}/>

                    <p className="mt-2 text-xs text-slate-500">
                        Flashcards
                    </p>

                    <p className="text-lg font-bold">
                        {flashcardSet.cardCount}
                    </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                    <BookOpen className="text-indigo-600" size={18}/>

                    <p className="mt-2 text-xs text-slate-500">
                        Credits
                    </p>

                    <p className="text-lg font-bold">
                        {flashcardSet.creditsUsed}
                    </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4"
                >

                    <CalendarDays className="text-violet-600" size={18}/>

                    <p className="mt-2 text-xs text-slate-500">
                        Created
                    </p>

                    <p className="text-sm font-semibold">
                        {flashcardSet.createdAt
                            ? new Date(
                                flashcardSet.createdAt
                            ).toLocaleDateString()
                            : "-"}
                    </p>

                </div>

            </div>

            <div className="mt-6">

                <p className="mb-2 text-sm font-medium text-slate-700">
                    Difficulties
                </p>

                <div className="flex flex-wrap gap-2">

                    {flashcardSet.difficulties.map(
                        (difficulty) => (

                            <span
                                key={difficulty}
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor(difficulty)}`}
                            >
                                {difficulty}
                            </span>

                        )
                    )}

                </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

                <button
                    onClick={() =>
                        onDelete(
                            flashcardSet.id
                        )
                    }
                    disabled={deleting}
                    className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50">

                    <Trash2 size={18} />

                    Delete

                </button>

                <button
                    onClick={() =>
                        onStudy(
                            flashcardSet.id
                        )
                    }
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 font-semibold text-white transition hover:opacity-90"
                >

                    Study

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

};

export default FlashcardSetCard;