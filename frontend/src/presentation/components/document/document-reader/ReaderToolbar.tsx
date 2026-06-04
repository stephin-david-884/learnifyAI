import React from "react";
import {ZoomIn, ZoomOut, ChevronLeft, ChevronRight} from "lucide-react";

type Props = {
    pageNumber: number;
    numPages: number;

    scale: number;

    onPrev: () => void;
    onNext: () => void;

    onZoomIn: () => void;
    onZoomOut: () => void;
};

const ReaderToolbar: React.FC<Props> = ({
    pageNumber,
    numPages,
    scale,

    onPrev,
    onNext,

    onZoomIn,
    onZoomOut,
}) => {

    return (
        <div
            className=" flex items-center justify-between border-b border-slate-200 px-4 py-3 bg-white"
        >

            <div className="flex items-center gap-2">

                <button
                    onClick={onPrev}
                    disabled={pageNumber <= 1}
                    className="rounded-lg border border-slate-200 p-2"
                >
                    <ChevronLeft size={18} />
                </button>

                <span className="text-sm font-medium">

                    {pageNumber} / {numPages}

                </span>

                <button
                    onClick={onNext}
                    disabled={
                        pageNumber >= numPages
                    }
                    className="rounded-lg border border-slate-200 p-2"
                >
                    <ChevronRight size={18} />
                </button>

            </div>

            <div className="flex items-center gap-2">

                <button
                    onClick={onZoomOut}
                    className="rounded-lg border border-slate-200 p-2"
                >
                    <ZoomOut size={18} />
                </button>

                <span className="w-16 text-center text-sm font-medium">
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={onZoomIn}
                    className="rounded-lg border border-slate-200 p-2"
                >
                    <ZoomIn size={18} />
                </button>

            </div>
        </div>
    );
};

export default ReaderToolbar;