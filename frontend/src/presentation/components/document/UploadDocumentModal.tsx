import { UploadCloud, X } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
    open: boolean;

    onClose: () => void;

    onSubmit: (
        title: string,
        file: File
    ) => Promise<void>;
};

const UploadDocumentModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {

        if (!title.trim() || !file) {
            return
        }

        try {

            setLoading(true);
            await onSubmit(title, file);

            setTitle("");
            setFile(null);

            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Upload Document
                    </h2>
                    <button
                        onClick={onClose}
                    >
                        <X className="h-6 w-6 text-slate-500" />
                    </button>
                </div>

                <div className='mt-6 space-y-5'>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            PDF File
                        </label>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-indigo-400">

                            <UploadCloud className="h-10 w-10 text-indigo-500" />

                            <p className="mt-3 text-sm text-slate-600">
                                Click to upload PDF
                            </p>

                            <input
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={(e) =>
                                    setFile(
                                        e.target.files?.[0] ||
                                        null
                                    )
                                }
                            />
                        </label>

                        {file && (
                            <p className="mt-2 text-sm text-slate-600">
                                {file.name}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading
                            ? "Uploading..."
                            : "Upload Document"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadDocumentModal
