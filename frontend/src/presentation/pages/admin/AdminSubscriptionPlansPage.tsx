import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    Plus,
    Pencil,
    Ban,
    Loader2,
} from "lucide-react";

import { useAdminSubscription } from "../../../hooks/useAdminSubscription";

import type { SubscriptionPlan } from "../../../types/subscription";

import CreateSubscriptionPlanModal from "../../components/admin/subscription/CreateSubscriptionPlanModal";
import EditSubscriptionPlanModal from "../../components/admin/subscription/EditSubscriptionPlanModal";

const AdminSubscriptionPlansPage: React.FC = () => {

    const {
        plans,
        loading,
        error,
        fetchPlans,
        deactivateSubscriptionPlan,
        clearError,
    } = useAdminSubscription();

    const [createOpen, setCreateOpen] =
        useState(false);

    const [selectedPlan, setSelectedPlan] =
        useState<SubscriptionPlan | null>(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error]);

    const sortedPlans = useMemo(() => {
        return [...plans].sort((a, b) => {

            if (a.name === b.name) {
                return b.version - a.version;
            }

            return a.name.localeCompare(b.name);
        });
    }, [plans]);

    const handleDeactivate = async (
        planId: string
    ) => {

        const confirmed = window.confirm(
            "Deactivate this subscription plan?"
        );

        if (!confirmed) return;

        try {

            await deactivateSubscriptionPlan(planId);

            toast.success(
                "Plan deactivated successfully"
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to deactivate plan";

            toast.error(message);
        }
    };

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

                
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-slate-200">

                            <thead className="bg-slate-50">
                                <tr>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Plan
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Billing
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Credits
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Features
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 bg-white">

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2 text-slate-500">

                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />

                                                Loading plans...

                                            </div>
                                        </td>
                                    </tr>

                                ) : sortedPlans.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-16 text-center text-sm text-slate-500"
                                        >
                                            No subscription plans found.
                                        </td>
                                    </tr>

                                ) : (

                                    sortedPlans.map((plan) => (

                                        <tr
                                            key={plan.id}
                                            className="transition hover:bg-slate-50"
                                        >

                                            {/* PLAN */}
                                            <td className="px-6 py-5">

                                                <div>

                                                    <p className="font-semibold text-slate-900">
                                                        {plan.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Version {plan.version}
                                                    </p>

                                                </div>

                                            </td>

                                            
                                            <td className="px-6 py-5 text-sm text-slate-700">
                                                {plan.billingCycle}
                                            </td>

                                            
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                                                ₹{plan.price}
                                            </td>

                                            
                                            <td className="px-6 py-5 text-sm text-slate-700">
                                                {plan.creditsPerMonth}
                                            </td>

                                            
                                            <td className="px-6 py-5">

                                                <div className="space-y-1 text-xs text-slate-600">

                                                    <p>
                                                        Max Docs:
                                                        {" "}
                                                        {plan.features.maxDocuments}
                                                    </p>

                                                    <p>
                                                        Interview Access:
                                                        {" "}
                                                        {plan.features.interviewAccess
                                                            ? "Yes"
                                                            : "No"}
                                                    </p>

                                                </div>

                                            </td>

                                            
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${plan.isActive
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-rose-100 text-rose-700"
                                                        }`}
                                                >
                                                    {plan.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>

                                            </td>

                                            
                                            <td className="px-6 py-5">

                                                <div className="flex items-center justify-end gap-2">

                                                    <button
                                                        onClick={() =>
                                                            setSelectedPlan(plan)
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </button>

                                                    {plan.isActive && (
                                                        <button
                                                            onClick={() =>
                                                                handleDeactivate(plan.id)
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                        >
                                                            <Ban size={14} />
                                                            Deactivate
                                                        </button>
                                                    )}

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

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
    );
};

export default AdminSubscriptionPlansPage;