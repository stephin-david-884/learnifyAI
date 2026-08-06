import React, { useEffect, useState, } from "react";

import { Mic } from "lucide-react";

import Spinner from "../../components/common/Spinner";

import Pagination from "../../components/common/pagination/Pagination";

import InterviewCard from "../../components/interview/InterviewCard";

import { useInterview } from "../../../hooks/useInterview";

const InterviewListPage: React.FC = () => {

    const {

        interviews,
        loading,
        page,
        limit,
        totalPages,
        fetchUserInterviews,

    } = useInterview();

    const [currentPage, setCurrentPage,] = useState(1);

    const [currentLimit, setCurrentLimit,] = useState(10);

    useEffect(() => {

        fetchUserInterviews(currentPage, currentLimit);

    }, [currentPage, currentLimit, fetchUserInterviews]);

    if (loading) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <Spinner />

            </div>

        )

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">

                    My Interviews

                </h1>

                <p className="mt-1 text-slate-500">

                    AI mock interviews generated from your documents.

                </p>

            </div>

            {interviews.length === 0 ? (

                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                    <Mic
                        size={48}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold">

                        No Interviews Yet

                    </h3>

                    <p className="mt-2 text-slate-500">

                        Generate your first AI interview from Learn Hub.

                    </p>

                </div>

            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {interviews.map(interview => (

                            <InterviewCard
                                key={interview.id}
                                interview={interview}
                            />

                        ))}

                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            limit={limit}
                            onPageChange={setCurrentPage}
                            onLimitChange={(newLimit) => {
                                setCurrentLimit(newLimit);
                                setCurrentPage(1);
                            }}
                        />
                    )}

                </>
            )}

        </div>

    )

}

export default InterviewListPage;