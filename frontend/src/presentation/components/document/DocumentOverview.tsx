import React from "react";
import {
    Calendar,
    FileText,
    Clock,
    CheckCircle,
} from "lucide-react";

import type {
    DocumentItem,
} from "../../../types/document";

type Props = {
    document: DocumentItem;
};

const DocumentOverview: React.FC<Props> = ({
    document,
}) => {

    const formatFileSize = (
        bytes: number
    ) => {

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(
                bytes / 1024
            ).toFixed(1)} KB`;
        }

        return `${(
            bytes /
            1024 /
            1024
        ).toFixed(1)} MB`;
    };

    const cards = [
        {
            title: "Status",
            value: document.status,
            icon: CheckCircle,
        },
        {
            title: "Pages",
            value:
                document.totalPages ??
                "—",
            icon: FileText,
        },
        {
            title: "File Size",
            value:
                formatFileSize(
                    document.fileSize
                ),
            icon: FileText,
        },
        {
            title: "Created",
            value: new Date(
                document.createdAt
            ).toLocaleDateString(),
            icon: Calendar,
        },
    ];

    return (
        <div className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Document Information
                </h2>

                <div className="mt-4 space-y-4">

                    <div>
                        <p className="text-sm text-slate-500">
                            Title
                        </p>

                        <p className="font-medium text-slate-900">
                            {document.title}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Original File
                        </p>

                        <p className="font-medium text-slate-900">
                            {document.originalFileName}
                        </p>
                    </div>

                </div>
            </div>

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >
                {cards.map((card) => {

                    const Icon =
                        card.icon;

                    return (
                        <div
                            key={card.title}
                            className="
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-5
                            "
                        >
                            <div className="flex items-center justify-between">

                                <span className="text-sm text-slate-500">
                                    {card.title}
                                </span>

                                <Icon
                                    size={18}
                                    className="text-red-500"
                                />
                            </div>

                            <p className="mt-3 text-xl font-bold text-slate-900">
                                {card.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                <div className="flex items-center gap-2">

                    <Clock
                        size={18}
                        className="text-red-500"
                    />

                    <h3 className="font-semibold text-slate-900">
                        Processing State
                    </h3>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                    This document has been processed,
                    chunked, embedded and indexed for
                    AI retrieval.
                </p>
            </div>

        </div>
    );
};

export default DocumentOverview;