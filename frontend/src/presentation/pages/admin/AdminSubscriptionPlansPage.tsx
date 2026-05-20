import React, { useEffect, useState } from 'react'
import { useAdminSubscription } from '../../../hooks/useAdminSubscription';
import type { SubscriptionPlan, GetSubscriptionPlansQuery, BillingCycle } from '../../../types/subscription';
import { useDebounce } from '../../../hooks/useDebounce';
import toast from 'react-hot-toast';
import EditSubscriptionPlanModal from '../../components/admin/subscription/EditSubscriptionPlanModal';
import CreateSubscriptionPlanModal from '../../components/admin/subscription/CreateSubscriptionPlanModal';
import AdminPagination from '../../components/common/table/AdminPagination';
import SubscriptionPlanTable from '../../components/admin/subscription/SubscriptionPlanTable';
import { Plus } from 'lucide-react';

const AdminSubscriptionPlansPage: React.FC = () => {

    const { plans, page, total, totalPages, loading, error, fetchPlans, deactivateSubscriptionPlan, clearError } = useAdminSubscription();

    const [createOpen, setCreateOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const [search, setSearch] = useState("");
    const [billingCycle, setBillingCycle] = useState<BillingCycle | "">("");
    const [status, _setStatus] = useState<boolean | "">("");

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {

        const params: GetSubscriptionPlansQuery = {
            page: currentPage,
            limit: rowsPerPage,
        };

        if (debouncedSearch.trim()) {
            params.search = debouncedSearch.trim();
        }

        if (billingCycle) {
            params.billingCycle = billingCycle;
        }

        if (status !== "") {
            params.isActive = status;
        }

        fetchPlans(params);
    }, [currentPage, rowsPerPage, debouncedSearch, billingCycle, status]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, billingCycle, status, rowsPerPage]);

    const handleDeactivate = async (planId: string) => {
        const confirmed = window.confirm("Deactivate this subscription plan?");

        if (!confirmed) return;

        try {
            await deactivateSubscriptionPlan(planId);
            toast.success("Plan deactivated successfully");

            fetchPlans({
                page: currentPage,
                limit: rowsPerPage,
                search: debouncedSearch || undefined,
                billingCycle:
                    billingCycle || undefined,
                isActive:
                    status !== ""
                        ? status
                        : undefined,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to deactivate plan";
            toast.error(message);
        }
    }

    return (
        <>

            <div className="space-y-6">

                <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Subscription Plans
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage subscription plans and pricing.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            setCreateOpen(true)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Create Plan
                    </button>

                </div>

                <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex flex-1 flex-col gap-4 md:flex-row">

                        <input
                            type="text"
                            placeholder="Search plans..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                        />

                        <select
                            value={billingCycle}
                            onChange={(e) =>
                                setBillingCycle(
                                    e.target.value as BillingCycle | ""
                                )
                            }
                            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                        >

                            <option value="">
                                All Billing Cycles
                            </option>

                            <option value="MONTHLY">
                                Monthly
                            </option>

                            <option value="YEARLY">
                                Yearly
                            </option>

                        </select>

                        {/* <select
                            value={status === "" ? "" : String(status)}
                            onChange={(e) => {
                                const value = e.target.value;

                                setStatus(
                                    value === ""
                                        ? ""
                                        : value === "true"
                                );
                            }

                            }
                            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="true">
                                Active
                            </option>

                            <option value="false">
                                Inactive
                            </option>

                        </select> */}

                    </div>

                    <div className="text-sm font-medium text-slate-500">

                        Total Plans:
                        {" "}
                        <span className="text-slate-900">
                            {total}
                        </span>

                    </div>

                </div>

                <SubscriptionPlanTable
                    plans={plans}
                    loading={loading}
                    onEdit={(plan) =>
                        setSelectedPlan(plan)
                    }
                    onDeactivate={
                        handleDeactivate
                    }
                />

                <AdminPagination
                    page={page}
                    totalPages={totalPages}
                    limit={rowsPerPage}
                    onPageChange={(newPage) =>
                        setCurrentPage(newPage)
                    }
                    onLimitChange={(newLimit) => {

                        setRowsPerPage(newLimit);

                        setCurrentPage(1);
                    }}
                />

            </div>

            <CreateSubscriptionPlanModal
                open={createOpen}
                onClose={() =>
                    setCreateOpen(false)
                }
            />

            <EditSubscriptionPlanModal
                open={!!selectedPlan}
                onClose={() =>
                    setSelectedPlan(null)
                }
                plan={selectedPlan}
            />

        </>
    )
}

export default AdminSubscriptionPlansPage
