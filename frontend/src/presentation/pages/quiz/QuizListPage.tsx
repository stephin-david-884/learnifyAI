import React, {
    useEffect,
} from "react";

import {
    ClipboardList,
} from "lucide-react";

import Spinner
from "../../components/common/Spinner";

import { useQuiz }
from "../../../hooks/useQuiz";
import QuizCard from "../../components/quiz/QuizCard";

const QuizListPage: React.FC = () => {

    const {
        quizzes,
        loading,
        fetchUserQuizzes,
    } = useQuiz();

    useEffect(() => {

        fetchUserQuizzes();

    }, [fetchUserQuizzes]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    My Quizzes
                </h1>

                <p className="mt-1 text-slate-500">
                    Generated quizzes from your documents.
                </p>

            </div>

            {quizzes.length === 0 ? (

                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                    <ClipboardList
                        size={48}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        No Quizzes Yet
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Generate your first quiz from Learn Hub.
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {quizzes.map((quiz) => (

                        <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default QuizListPage;