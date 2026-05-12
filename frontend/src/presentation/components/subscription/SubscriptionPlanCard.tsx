import React from "react";
import type { SubscriptionPlan } from "../../../types/subscription";
import { Check, Crown } from "lucide-react";

type Props = {
    plan: SubscriptionPlan;
    isCurrentPlan?: boolean;
    onUpgrade: (planId: string) => void;
    loading?: boolean;
};

const SubscriptionPlanCard: React.FC<Props> = ({
    plan,
    isCurrentPlan = false,
    onUpgrade,
    loading = false,
}) => {

    const isFree = plan.price === 0;

    return (
        <div
            className={`
                relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                ${isCurrentPlan
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200"
                }
            `}
        >
            {isCurrentPlan && (
                <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    Current Plan
                </div>
            )}

            <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-red-50 p-3">
                    <Crown className="text-red-500" size={22} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        {plan.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {plan.billingCycle}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-slate-900">
                        ₹{plan.price}
                    </span>

                    {!isFree && (
                        <span className="mb-1 text-sm text-slate-500">
                            / {plan.billingCycle.toLowerCase()}
                        </span>
                    )}
                </div>

                {plan.discount && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                        Save {plan.discount}% with this plan
                    </p>
                )}
            </div>

            <div className="mt-6 space-y-4">
                <FeatureItem
                    text={`${plan.creditsPerMonth} AI credits`}
                />

                <FeatureItem
                    text={`${plan.features.maxDocuments} documents`}
                />

                <FeatureItem
                    text={
                        plan.features.interviewAccess
                            ? "Interview access included"
                            : "No interview access"
                    }
                />
            </div>

            <button
                disabled={isCurrentPlan || loading}
                onClick={() => onUpgrade(plan.id)}
                className={`
                    mt-8 w-full rounded-xl py-3 text-sm font-semibold transition
                    ${isCurrentPlan
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-[1.01]"
                    }
                `}
            >
                {isCurrentPlan
                    ? "Current Plan"
                    : loading
                        ? "Processing..."
                        : isFree
                            ? "Get Started"
                            : "Upgrade Plan"}
            </button>
        </div>
    );
};

const FeatureItem = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-1">
                <Check size={12} className="text-green-600" />
            </div>

            <span className="text-sm text-slate-700">
                {text}
            </span>
        </div>
    );
};

export default SubscriptionPlanCard;