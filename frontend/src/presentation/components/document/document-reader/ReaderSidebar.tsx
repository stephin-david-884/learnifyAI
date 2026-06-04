import React from "react";

type Props = {
    numPages: number;

    currentPage: number;

    onSelectPage: (
        page: number
    ) => void;
};

const ReaderSidebar: React.FC<Props> = ({
    numPages,
    currentPage,
    onSelectPage,
}) => {

    return (
        <div
            className="w-24 overflow-y-auto border-r border-slate-200 bg-slate-50"
        >
            <div className="p-2 space-y-2">

                {Array.from(
                    { length: numPages },
                    (_, index) =>
                        index + 1
                ).map((page) => (

                    <button
                        key={page}
                        onClick={() =>
                            onSelectPage(page)
                        }
                        className={`flex h-20 w-full items-center justify-center rounded-xl border text-sm font-medium
                            ${
                                currentPage === page
                                    ? "border-red-500 bg-red-50 text-red-600"
                                    : "border-slate-200 bg-white"
                            }
                        `}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReaderSidebar;