import React from 'react';
import type { DocumentItem } from '../../../types/document';
import { FileText, Loader2, Trash2 } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

type Props = {
    document: DocumentItem;
    onDelete: (id: string) => void;
    onOpen: (id: string) => void;
};

const DocumentCard: React.FC<Props> = ({ document, onDelete, onOpen }) => {

    const isProcessing = document.status === "PROCESSING";

    const isFailed = document.status === "FAILED";

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
                    <FileText className='h-6 w-6 text-indigo-600' />
                </div>
                <button
                    onClick={() =>
                        onDelete(document.id)
                    }
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                    <Trash2 className='h-5 w-5' />
                </button>
            </div>

            <div className="mt-4">
                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                    {document.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    {document.originalFileName}
                </p>
            </div>

            <div className="mt-4 space-y-3">

                <DocumentStatusBadge
                    status={document.status}
                />

                {isProcessing && (
                    <div>

                        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">

                            <span>
                                {document.processingStage ??
                                    "Processing"}
                            </span>

                            <span>
                                {document.processingProgress}%
                            </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                            <div
                                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                                style={{
                                    width: `${document.processingProgress}%`,
                                }}
                            />

                        </div>

                    </div>
                )}

            </div>

            <div className="mt-6">

                {isProcessing ? (
                    <button
                        disabled
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-white"
                    >
                        <Loader2 className="h-4 w-4 animate-spin" />

                        {document.processingStage ?? "Processing..."}
                    </button>
                ) : isFailed ? (
                    <button
                        disabled
                        className="w-full rounded-2xl bg-red-400 px-4 py-3 text-sm font-semibold text-white"
                    >
                        Failed
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            onOpen(document.id)
                        }
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Start Learning
                    </button>
                )}
            </div>
        </div>
    )
}

export default DocumentCard
