import React, { useEffect } from "react";
import { useSubscription } from "../../../hooks/useSubscription";
import { CreditCard, CheckCircle2, XCircle, Clock3} from "lucide-react";
import toast from "react-hot-toast";

const PaymentHistoryPage: React.FC = () => {

  const {
    payments,
    fetchUserPayments,
    loading,
    error,
  } = useSubscription();

  useEffect(() => {
    fetchUserPayments();
  }, [fetchUserPayments]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const getStatusIcon = (status: string) => {

    switch (status) {

      case "SUCCESS":
        return (
          <CheckCircle2
            size={18}
            className="text-green-500"
          />
        );

      case "FAILED":
        return (
          <XCircle
            size={18}
            className="text-red-500"
          />
        );

      default:
        return (
          <Clock3
            size={18}
            className="text-yellow-500"
          />
        );
    }
  };

  const getStatusBadge = (status: string) => {

    switch (status) {

      case "SUCCESS":
        return "bg-green-100 text-green-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (

    <div className="mx-auto max-w-5xl">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Payment History
        </h1>

        <p className="mt-2 text-slate-600">
          View all your subscription payments and invoices.
        </p>
      </div>

      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-500"></div>
        </div>
      ) : payments.length === 0 ? (

        
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <CreditCard
              className="text-red-500"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            No Payments Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Your subscription payments will appear here.
          </p>
        </div>

      ) : (

        
        <div className="space-y-4">

          {payments.map((payment) => (

            <div
              key={payment.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                
                <div>

                  <div className="flex items-center gap-2">

                    {getStatusIcon(payment.status)}

                    <h3 className="text-lg font-semibold text-slate-900">
                      {
                        payment.planSnapshot.name
                      }
                    </h3>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Order ID:
                    {" "}
                    {payment.razorpayOrderId}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      payment.createdAt
                        ? new Date(
                          payment.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                        : "-"
                    }
                  </p>
                </div>

                
                <div className="flex flex-col items-start gap-3 md:items-end">

                  <div className="text-2xl font-bold text-slate-900">
                    ₹{payment.amount}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold${getStatusBadge(payment.status)}`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default PaymentHistoryPage;