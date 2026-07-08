import { AlertTriangle } from 'lucide-react';
import React from 'react';

type Props = {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmDialog: React.FC<Props> = ({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    loading = false,
    onConfirm,
    onCancel,
}) => {

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className='w-full max-w-md rounded-3xl bg-white p-6 shadow-xl'>
                <div className="flex items-start gap-4">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${danger
                                ? "bg-red-100"
                                : "bg-amber-100"
                            }`}
                    >
                        <AlertTriangle
                            className={`h-6 w-6 ${danger
                                    ? "text-red-600"
                                    : "text-amber-600"
                                }`}
                        />
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-lg font-semibold text-slate-900'>
                            {title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`rounded-xl px-4 py-2 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${danger
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-slate-900 hover:bg-slate-800"
                            }`}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog;
