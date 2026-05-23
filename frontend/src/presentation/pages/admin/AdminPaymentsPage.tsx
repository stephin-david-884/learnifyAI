import React, { useEffect, useState } from 'react'
import { useAdminSubscription } from '../../../hooks/useAdminSubscription'
import type { GetAdminPaymentsQuery, PaymentStatus } from '../../../types/admin/payment';
import { useDebounce } from '../../../hooks/useDebounce';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import PaymentTable from '../../components/admin/payment/PaymentTable';
import Pagination from '../../components/common/pagination/Pagination';

const AdminPaymentsPage: React.FC = () => {

    const { payments, loading, error, total, page, totalPages, fetchPayments, clearError } = useAdminSubscription();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<PaymentStatus | "">("");

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params: GetAdminPaymentsQuery = { page: currentPage, limit: rowsPerPage };

        if (debouncedSearch.trim()) {
            params.search = debouncedSearch.trim();
        }

        if (status) {
            params.status = status
        }

        fetchPayments(params);
    }, [currentPage, rowsPerPage, debouncedSearch, status]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError])

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, status, rowsPerPage])

    return (
        <div className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Payments
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View and manage all payment transactions.
                </p>

            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

                <div className="flex flex-1 flex-col gap-4 md:flex-row">

                    <div className="relative w-full">
                        <Search
                            size={18}
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                        />
                        <input
                            type="text"
                            placeholder='Search payments...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500'
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as PaymentStatus | "")}
                        className='rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500'
                    >

                        <option value="">
                            All status
                        </option>

                        <option value="CREATED">
                            Created
                        </option>

                        <option value="SUCCESS">
                            Success
                        </option>

                        <option value="FAILED">
                            Failed
                        </option>

                    </select>

                </div>

                <div className="text-sm font-medium text-slate-500">
                    Total payments: { " "}
                    <span className="text-slate-900">
                        {total}
                    </span>
                </div>

            </div>

            <PaymentTable 
                payments={payments}
                loading={loading}
            />

            <Pagination 
                page={page}
                totalPages={totalPages}
                limit={rowsPerPage}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                onLimitChange={(newLimit) => {
                    setRowsPerPage(newLimit);
                    setCurrentPage(1);
                }}
            />

        </div>
    )
}

export default AdminPaymentsPage
