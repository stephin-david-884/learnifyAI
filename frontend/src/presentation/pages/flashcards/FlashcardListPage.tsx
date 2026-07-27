import React, { useCallback,  useEffect, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import Pagination from "../../components/common/pagination/Pagination";
import { useFlashcards } from "../../../hooks/useFlashcards";
import FlashcardSetCard from "../../components/flashcard/FlashcardSetCard";

const FlashcardListPage: React.FC = () => {

    const navigate =
        useNavigate();

    const {

        flashcardSets,
        loading,
        deleting,
        page,
        limit,
        totalPages,
        fetchUserFlashcardSets,
        deleteSet,

    } = useFlashcards();

    const [ search, setSearch ] = useState("");

    const loadFlashcards =
        useCallback(() => {

            fetchUserFlashcardSets({

                page,

                limit,

                search: search.trim() || undefined,

            });

        }, [
            fetchUserFlashcardSets,
            page,
            limit,
            search,
        ]);

    useEffect(() => {

        loadFlashcards();

    }, [loadFlashcards]);

    const handleStudy =
        useCallback(

            (flashcardSetId: string) => {

                navigate(`/flashcards/${flashcardSetId}`);

            },

            [navigate]

        );

    const handleDelete =
        useCallback(

            async (
                flashcardSetId: string
            ) => {

                const result =
                    await Swal.fire({

                        title:
                            "Delete Flashcard Set?",

                        text:
                            "This action cannot be undone.",

                        icon:
                            "warning",

                        showCancelButton:
                            true,

                        confirmButtonColor:
                            "#ef4444",

                        confirmButtonText:
                            "Delete",

                        cancelButtonText:
                            "Cancel",

                    });

                if (!result.isConfirmed) {
                    return;
                }

                try {

                    await deleteSet(
                        flashcardSetId
                    );

                    await Swal.fire({

                        icon:
                            "success",

                        title:
                            "Deleted",

                        text:
                            "Flashcard set deleted successfully.",

                        timer:
                            1500,

                        showConfirmButton:
                            false,

                    });

                } catch (error) {

                    const message =
                        error instanceof Error
                            ? error.message
                            : "Failed to delete flashcard set.";

                    await Swal.fire({

                        icon:
                            "error",

                        title:
                            "Delete Failed",

                        text:
                            message,

                    });

                }

            },

            [deleteSet]

        );

    if (loading) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <Spinner />

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-900">

                        My Flashcards

                    </h1>

                    <p className="mt-1 text-slate-500">

                        Review and study your AI generated flashcard sets.

                    </p>

                </div>

            </div>

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Search by topic..."
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                />

            </div>

            {flashcardSets.length === 0 ? (

                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                    <BookOpen
                        size={52}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-5 text-xl font-bold text-slate-900">

                        No Flashcards Yet

                    </h3>

                    <p className="mt-2 text-slate-500">

                        Generate your first flashcard set from the Learn Hub.

                    </p>

                </div>

            ) : (

                <>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {flashcardSets.map(
                            (
                                flashcardSet
                            ) => (

                                <FlashcardSetCard

                                    key={flashcardSet.id}

                                    flashcardSet={flashcardSet}

                                    deleting={deleting}

                                    onStudy={handleStudy}

                                    onDelete={handleDelete}

                                />

                            )
                        )}

                    </div>

                    <Pagination

                        page={page}

                        totalPages={totalPages}

                        limit={limit}

                        onPageChange={(
                            newPage
                        ) => {

                            fetchUserFlashcardSets({

                                page:
                                    newPage,

                                limit,

                                search:
                                    search.trim() ||
                                    undefined,

                            });

                        }}

                        onLimitChange={(
                            newLimit
                        ) => {

                            fetchUserFlashcardSets({

                                page: 1,

                                limit:
                                    newLimit,

                                search:
                                    search.trim() ||
                                    undefined,

                            });

                        }}

                    />

                </>

            )}

        </div>

    );

};

export default FlashcardListPage;