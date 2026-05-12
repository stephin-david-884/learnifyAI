import React, { useEffect, useState } from "react";
import { useSubscription } from "../../../hooks/useSubscription";
import SubscriptionPlanCard from "../../components/subscription/SubscriptionPlanCard";
import toast from "react-hot-toast";

const SubscriptionPlansPage: React.FC = () => {

  const {
    plans,
    activeSubscription,
    fetchAvailablePlans,
    createOrder,
    loading,
    error,
  } = useSubscription();

  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailablePlans();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleUpgrade = async (planId: string) => {
    try {
      setProcessingPlanId(planId);

      const order =
        await createOrder(planId);

      console.log("ORDER CREATED:", order);

      toast.success("Payment initialized");

    } catch (error) {
      console.error(error);

      toast.error("Failed to initialize payment");
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
        ) : (
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
        )}
      </div>
    
  );
};

export default SubscriptionPlansPage;