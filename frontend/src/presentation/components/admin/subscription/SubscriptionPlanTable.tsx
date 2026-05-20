import React from 'react'
import type { SubscriptionPlan } from '../../../../types/subscription'
import AdminTable from '../../common/table/AdminTable';
import { Ban, Pencil } from 'lucide-react';

type Props = {
    plans: SubscriptionPlan[];
    loading: boolean;
    onEdit: (
        plan: SubscriptionPlan
    ) => void;
    onDeactivate: (
        planId: string
    ) => void;
};

const SubscriptionPlanTable: React.FC<Props> = ({
    plans,
    loading,
    onEdit,
    onDeactivate
}) => {
    return (
        <AdminTable
            headers={[
                "Plan",
                "Billing",
                "Price",
                "Credits",
                "Features",
                "Status",
                "Actions"
            ]}
            loading={loading}
            isEmpty={plans.length === 0}
            emptyMessage='No subscripton plans found'
            colSpan={7}
        >

            {plans.map((plan) => (

                <tr key={plan.id} className='transition hover:bg-slate-50'>
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
                                {plan.features.interviewAccess ? "Yes" : "No"}
                            </p>
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                plan.isActive
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                            }`}
                        >
                            {plan.isActive
                                ? "Active"
                                : "Inactive"
                            }
                        </span>
                    </td>
                    <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => onEdit(plan)}
                                className='inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100'
                            >
                                <Pencil size={14}/>
                                Edit
                            </button>
                            {plan.isActive && (
                                <button
                                    onClick={() => onDeactivate(plan.id)}
                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    <Ban size={14}/>
                                    Deactivate
                                </button>
                            )}
                        </div>
                    </td>
                </tr>

            ))}

        </AdminTable>
    )
}

export default SubscriptionPlanTable
