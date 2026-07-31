import React from "react";
import { FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyDashboard: React.FC = () => {

    return (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">

                <FileText
                    size={36}
                    className="text-red-500"
                />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
                Welcome to LearnifyAI
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">
                Upload your first learning document to unlock quizzes,
                flashcards, interviews, progress tracking, and much more.
            </p>

            <Link
                to="/documents"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >

                <Upload size={18} />

                Upload First Document

            </Link>

        </div>

    );
};

export default EmptyDashboard;