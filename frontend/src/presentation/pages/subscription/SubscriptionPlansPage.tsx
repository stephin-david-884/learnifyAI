import React, { useEffect, useState } from "react";
import { useSubscription } from "../../../hooks/useSubscription";
import SubscriptionPlanCard from "../../components/subscription/SubscriptionPlanCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import loadRazorpay from "../../../utils/loadRazorpay";
import Pagination from "../../components/common/pagination/Pagination";

const SubscriptionPlansPage: React.FC = () => {

  const {
    plans,
    activeSubscription,
    verifySubscriptionPayment,
    fetchActiveSubscription,
    fetchCreditStatus,
    fetchAvailablePlans,
    createOrder,
    loading,
    totalPages,
    error,
  } = useSubscription();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    fetchAvailablePlans({ page, limit });
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleUpgrade = async (planId: string) => {

    try {
      setProcessingPlanId(planId);

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error(
          "Failed to load payment gateway"
        );

        return;
      }

      const order = await createOrder(planId);

      const razorpay = new window.Razorpay({
        key: order.key,

        amount: order.amount,

        currency: order.currency,

        name: "LearnifyAI",

        description: `${order.planName} Subscription`,

        order_id: order.orderId,

        prefill: {
          name: user?.name,

          email: user?.email,
        },

        theme: {
          color: "#ef4444",
        },

        handler: async (response) => {

          try {

            await verifySubscriptionPayment({
              razorpayOrderId:
                response.razorpay_order_id,

              razorpayPaymentId:
                response.razorpay_payment_id,

              razorpaySignature:
                response.razorpay_signature,
            });

            //Refresh redux state
            await Promise.all([
              fetchActiveSubscription(),
              fetchCreditStatus(),
            ]);

            toast.success(
              "Subscription activated successfully"
            );

            // 6. Redirect
            navigate("/dashboard");

          } catch (error) {

            console.error(error);

            toast.error(
              "Payment verification failed"
            );
          }
        },

        modal: {
          ondismiss: () => {
            toast("Payment cancelled");
          },
        },
      });

      // 4. Open modal
      razorpay.open();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to initialize payment"
      );

    } finally {

      setProcessingPlanId(null);
    }
  };

  return (

    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Upgrade Your Plan
        </h1>

        <p className="mt-2 text-slate-600">
          Unlock more AI credits and premium features.
        </p>
      </div>

      {loading && plans.length === 0 ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-500"></div>
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No subscription plans available
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Please check back later.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => {

              const isCurrentPlan =
                activeSubscription?.planId === plan.id;

              return (
                <SubscriptionPlanCard
                  key={plan.id}
                  plan={plan}
                  isCurrentPlan={isCurrentPlan}
                  onUpgrade={handleUpgrade}
                  loading={
                    processingPlanId === plan.id
                  }
                />
              );
            })}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </div>
      )}
    </div>

  );
};

export default SubscriptionPlansPage;