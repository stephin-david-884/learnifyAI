import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Spinner from "../../components/common/Spinner";

import { useFlashcards } from "../../../hooks/useFlashcards";
import FlashcardProgress from "../../components/flashcard/FlashcardProgress";
import Flashcard from "../../components/flashcard/Flashcard";
import FlashcardControls from "../../components/flashcard/FlashcardControls";

const FlashcardStudyPage: React.FC = () => {

    const { flashcardSetId } =
        useParams<{
            flashcardSetId: string;
        }>();

    const navigate =
        useNavigate();

    const {
        currentFlashcardSet,
        loading,
        error,
        fetchFlashcardSet,
    } = useFlashcards();

    const [currentIndex, setCurrentIndex] = useState(0);

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {

        if (flashcardSetId) {

            fetchFlashcardSet(
                flashcardSetId
            );

        }

    }, [
        flashcardSetId,
        fetchFlashcardSet,
    ]);

    useEffect(() => {

        setFlipped(false);

    }, [currentIndex]);

    useEffect(() => {

        setCurrentIndex(0);

    }, [currentFlashcardSet]);

    const cards = currentFlashcardSet?.cards ?? [];

    const total = cards.length;

    const currentCard =
        useMemo(() => {

            if (!cards.length) {
                return null;
            }

            return cards[currentIndex];

        }, [ cards, currentIndex ]);

    const handlePrevious = () => {

        if (currentIndex === 0) {
            return;
        }

        setCurrentIndex(prev => prev - 1);

    };

    const handleNext = () => {

        if (currentIndex >= total - 1) {
            return;
        }

        setCurrentIndex(
            prev => prev + 1
        );

    };

    const handleRestart = () => {

        setCurrentIndex(0);

        setFlipped(false);

    };

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <Spinner />

            </div>

        );

    }

    if (error) {

        return (

            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

                <h2 className="text-xl font-bold text-red-700">

                    Failed to load flashcards

                </h2>

                <p className="mt-2 text-red-600">

                    {error}

                </p>

                <button
                    onClick={() => navigate("/flashcards")}
                    className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
                >

                    Back

                </button>

            </div>

        );

    }

    if (
        !currentFlashcardSet ||
        !currentCard
    ) {

        return (

            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                No flashcards found.

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-5xl space-y-8">

            <div>

                <button
                    onClick={() =>
                        navigate("/flashcards")
                    }
                    className="text-sm font-medium text-blue-600 hover:underline"
                >

                    ← Back to Flashcards

                </button>

                <h1 className="mt-4 text-3xl font-bold text-slate-900">

                    {currentFlashcardSet.topic}

                </h1>

                <p className="mt-2 text-slate-500">

                    Study one card at a time.

                </p>

            </div>

            <FlashcardProgress
            topic={currentFlashcardSet.topic}
                current={currentIndex + 1}
                total={total}
            />

            <Flashcard
                card={currentCard}
                flipped={flipped}
                onFlip={() =>
                    setFlipped(prev => !prev)
                }
            />

            <FlashcardControls
                currentIndex={currentIndex + 1}
                totalCards={total}
                flipped={flipped}
                onPrevious={
                    handlePrevious
                }
                onNext={
                    handleNext
                }
                onFlip={() => setFlipped(prev => !prev)}
                onRestart={
                    handleRestart
                }
            />

        </div>

    );

};

export default FlashcardStudyPage;