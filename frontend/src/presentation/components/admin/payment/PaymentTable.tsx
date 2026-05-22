import React from 'react'
import type { Payment } from '../../../../types/admin/payment'
import AdminTable from '../../common/table/AdminTable';

type Props = {
    payments: Payment[];
    loading: boolean;
}

const PaymentTable: React.FC<Props> = ({ payments, loading }) => {
    return (
        <AdminTable
            headers={[
                "User",
                "Plan",
                "Amount",
                "Billing",
                "Status",
                "Date",
                "Payment ID",
            ]}
            loading={loading}
            isEmpty={payments.length === 0}
            emptyMessage='No payments found'
            colSpan={7}
        >
            {payments.map((payment) => (
                <tr
                    key={payment.id}
                    className='transition hover:bg-slate-50'
                >
                    {/*USER */}
                    <td className="px-6 py-5">
                        <div>
                            <p className="font-medium text-slate-900">
                                {payment.userId}
                            </p>
                        </div>
                    </td>

                    {/* PLAN */}
                    <td className='px-6 py-5'>
                        <div>
                            <p className="font-semibold text-slate-900">
                                {payment.planSnapshot.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                ₹{payment.planSnapshot.price}
                            </p>
                        </div>
                    </td>

                    {/* AMOUNT */}
                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                        ₹{payment.amount}
                    </td>

                    {/*BILLING */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                        {payment.planSnapshot.billingCycle}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "SUCCESS"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : payment.status === "FAILED"
                                        ? "bg-rose-100 text-rose-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {payment.status}
                        </span>
                    </td>

                    {/*DATE */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                        {new Date(
                            payment.createdAt
                        ).toLocaleDateString()}
                    </td>

                    {/*PAYMENT ID */}
                    <td className="px-6 py-5 text-sm text-slate-700">
                        {payment.razorpayPaymentId || "-"}
                    </td>
                </tr>
            ))}
        </AdminTable>
    )
}

export default PaymentTable
