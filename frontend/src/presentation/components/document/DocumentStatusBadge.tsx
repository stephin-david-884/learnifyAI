import React from 'react';
import type { DocumentStatus } from '../../../types/document';

type Props = {
    status: DocumentStatus
}

const statusStyles: Record<DocumentStatus, string> = {
    READY:
        "bg-emerald-100 text-emerald-700",

    PROCESSING:
        "bg-amber-100 text-amber-700",

    FAILED:
        "bg-red-100 text-red-700",

    UPLOADING:
        "bg-blue-100 text-blue-700",
};

const DocumentStatusBadge: React.FC<Props> = ({ status }) => {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
            {status}
        </span>
    )
}

export default DocumentStatusBadge;
