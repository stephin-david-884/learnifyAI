import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import type { ContinueLearning } from "../../../types/dashboard";

type Props = {
    document?: ContinueLearning;
};

const ContinueLearningCard: React.FC<Props> = ({
    document,
}) => {

    if (!document) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                        <BookOpen className="h-6 w-6 text-slate-500" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Continue Learning
                        </h2>

                        <p className="text-sm text-slate-500">
                            No recent documents available.
                        </p>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                    <BookOpen className="h-6 w-6 text-red-600" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Continue Learning
                    </h2>

                    <p className="text-sm text-slate-500">
                        Pick up where you left off
                    </p>
                </div>

            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                    {document.title}
                </h3>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                    {document.status}
                </p>

                <Link
                    to={`/documents/${document.documentId}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                    Resume Learning

                    <ArrowRight className="h-4 w-4" />
                </Link>

            </div>

        </div>
    );
};

export default ContinueLearningCard;