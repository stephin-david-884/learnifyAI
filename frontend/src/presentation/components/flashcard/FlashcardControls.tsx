import React from "react";
import { ArrowLeft, ArrowRight, RotateCcw, RefreshCw } from "lucide-react";

type Props = {

    currentIndex: number;
    totalCards: number;
    flipped: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onFlip: () => void;
    onRestart: () => void;
};

const FlashcardControls: React.FC<Props> = ({

    currentIndex,
    totalCards,
    flipped,
    onPrevious,
    onNext,
    onFlip,
    onRestart,

}) => {

    const isFirst = currentIndex === 0;

    const isLast = currentIndex === totalCards - 1;

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <button
                    onClick={onPrevious}
                    disabled={isFirst}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <ArrowLeft size={18} />

                    Previous

                </button>

                <button
                    onClick={onFlip}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:opacity-90"
                >

                    <RotateCcw size={18} />

                    {flipped ? "Show Question" : "Reveal Answer"}

                </button>

                <button
                    onClick={onNext}
                    disabled={isLast}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    Next

                    <ArrowRight size={18} />

                </button>

            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">

                <button
                    onClick={onRestart}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
                >

                    <RefreshCw size={18} />

                    Restart Study Session

                </button>

            </div>

        </div>

    );

};

export default FlashcardControls;