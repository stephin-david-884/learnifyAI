import React from 'react';

type Props = {
    page: number;
    totalPages: number;
    limit: number;
    onPageChange: (
        page: number
    ) => void;
    onLimitChange: (
        limit: number
    ) => void;
};

const AdminPagination: React.FC<Props> = ({
    page,
    totalPages,
    limit,
    onPageChange,
    onLimitChange
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className='flex items-center gap-3'>
                <span className='text-sm text-slate-600'>
                    Rows per page
                </span>

                <select
                    value={limit}
                    onChange={(e) =>
                        onLimitChange(Number(e.target.value))
                    }
                    className='rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500'
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>

            </div>

            <div className='flex items-center gap-3'>

                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className='rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    Previous
                </button>

                <span className="text-sm font-medium text-slate-700">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className='rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    Next
                </button>    
            </div>

        </div>
    )
}

export default AdminPagination
