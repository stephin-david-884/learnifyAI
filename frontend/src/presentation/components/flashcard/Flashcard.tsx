import React from "react";
import { RotateCcw, HelpCircle, CheckCircle2 } from "lucide-react";
import type { Flashcard as FlashcardItem, FlashcardDifficulty } from "../../../types/flashcard";

type Props = {
    card: FlashcardItem;

    flipped: boolean;

    onFlip: () => void;
};

const difficultyStyles: Record<
    FlashcardDifficulty,
    string
> = {
    EASY:
        "bg-emerald-100 text-emerald-700",

    MEDIUM:
        "bg-amber-100 text-amber-700",

    HARD:
        "bg-red-100 text-red-700",
};

const Flashcard: React.FC<Props> = ({
    card,
    flipped,
    onFlip,
}) => {

    return (

        <div
            className="group mx-auto w-full max-w-3xl"
            style={{
                perspective: "1400px",
            }}
        >

            <button
                type="button"
                onClick={onFlip}
                className="block h-[420px] w-full cursor-pointer rounded-3xl text-left focus:outline-none focus:ring-4 focus:ring-blue-200"
            >

                <div
                    className="relative h-full w-full transition-transform duration-700"
                    style={{
                        transformStyle:
                            "preserve-3d",

                        transform:
                            flipped
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                    }}
                >

                    <div
                        className="absolute inset-0 flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
                        style={{
                            backfaceVisibility:
                                "hidden",
                        }}
                    >

                        <div className="flex items-center justify-between">

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${difficultyStyles[
                                    card.difficulty
                                ]}`}
                            >

                                {card.difficulty}

                            </span>

                            <div className="flex items-center gap-2 text-sm text-slate-400">

                                <RotateCcw size={16}/>

                                Tap to flip

                            </div>

                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center">

                            <HelpCircle
                                size={56}
                                className="mb-6 text-blue-500"
                            />

                            <h2 className="text-center text-3xl font-bold leading-relaxed text-slate-900">

                                {card.question}

                            </h2>

                        </div>

                        <p className="text-center text-sm text-slate-400">

                            Think of the answer before revealing it.

                        </p>

                    </div>

                    <div
                        className="absolute inset-0 flex h-full flex-col rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-xl"
                        style={{
                            transform:
                                "rotateY(180deg)",

                            backfaceVisibility:
                                "hidden",
                        }}
                    >

                        <div className="flex items-center justify-between">

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${difficultyStyles[
                                    card.difficulty
                                ]}`}
                            >

                                {card.difficulty}

                            </span>

                            <div className="flex items-center gap-2 text-sm text-slate-500">

                                <RotateCcw size={16}/>

                                Tap to flip back

                            </div>

                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center">

                            <CheckCircle2
                                size={56}
                                className="mb-6 text-emerald-500"
                            />

                            <p className="text-center text-2xl font-semibold leading-relaxed text-slate-800">

                                {card.answer}

                            </p>

                        </div>

                        <p className="text-center text-sm text-slate-500">

                            Great! Continue to the next flashcard.

                        </p>

                    </div>

                </div>

            </button>

        </div>

    );

};

export default Flashcard;