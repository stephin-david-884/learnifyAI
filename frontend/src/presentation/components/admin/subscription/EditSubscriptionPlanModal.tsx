import React, {
    useState,
} from "react";

import toast from "react-hot-toast";

import type {
    BillingCycle,
    CreateSubscriptionPlanPayload,
    SubscriptionPlan,
} from "../../../../types/subscription";

import { useAdminSubscription } from "../../../../hooks/useAdminSubscription";
import { subscriptionPlanSchema } from "../../../../lib/validation/subscriptionPlan.validation";
import type { ZodIssue } from "zod";

type Props = {
    open: boolean;
    onClose: () => void;
    plan: SubscriptionPlan | null;
};

const initialState: CreateSubscriptionPlanPayload = {
    name: "",
    price: 0,
    creditsPerMonth: 0,
    discount: 0,

    features: {
        maxDocuments: 0,
        interviewAccess: false,
    },

    billingCycle: "MONTHLY",

    durationInDays: 30,

    creditResetIntervalInDays: 30,
};

const mapPlanToFormData = (
    plan: SubscriptionPlan
): CreateSubscriptionPlanPayload => ({
    name: plan.name,

    price: plan.price,

    creditsPerMonth: plan.creditsPerMonth,

    discount: plan.discount ?? 0,

    features: {
        maxDocuments: plan.features.maxDocuments,
        interviewAccess: plan.features.interviewAccess,
    },

    billingCycle: plan.billingCycle,

    durationInDays: plan.durationInDays,

    creditResetIntervalInDays:
        plan.creditResetIntervalInDays,
});

const EditSubscriptionPlanModal: React.FC<Props> = ({
    open,
    onClose,
    plan,
}) => {

    const {
        updateSubscriptionPlan,
        loading,
    } = useAdminSubscription();


    const [formData, setFormData] =
    useState<CreateSubscriptionPlanPayload>(() =>
        plan
            ? mapPlanToFormData(plan)
            : initialState
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!open || !plan) return null;

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {

        const {
            name,
            value,
            type,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "number"
                    ? Number(value)
                    : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleFeatureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            features: {
                ...prev.features,

                [name]:
                    type === "checkbox"
                        ? checked
                        : Number(value),
            },
        }));
        setErrors((prev) => ({
            ...prev,
            [`features.${name}`]: "",
        }));
    };

    const handleBillingCycleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {

        const value =
            e.target.value as BillingCycle;

        setFormData((prev) => ({
            ...prev,

            billingCycle: value,

            durationInDays:
                value === "YEARLY"
                    ? 365
                    : 30,
        }));
    };

    const mapZodErrors = (issues: ZodIssue[]) => {
        const fieldErrors: Record<string, string> = {};

        issues.forEach((issue) => {
            const path = issue.path.join(".");

            fieldErrors[path] = issue.message;
        });

        return fieldErrors;
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        const result = subscriptionPlanSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = mapZodErrors(
                result.error.issues
            );
            setErrors(formattedErrors);
            return;
        }

        try {

            await updateSubscriptionPlan(
                formData
            );

            toast.success(
                "Subscription plan updated successfully"
            );

            onClose();

            // navigate("/admin/dashboard");

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update plan";

            toast.error(message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-xl font-bold text-slate-900">
                        Edit Subscription Plan
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Updating creates a new version of this plan.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Plan Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="PRO"
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.name
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`
                                }
                                
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Billing Cycle
                            </label>

                            <select
                                value={
                                    formData.billingCycle
                                }
                                onChange={
                                    handleBillingCycleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                            >
                                <option value="MONTHLY">
                                    Monthly
                                </option>

                                <option value="YEARLY">
                                    Yearly
                                </option>
                            </select>
                        </div>

                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                min={0}
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.price
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`}
                            />

                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Credits Per Month
                            </label>

                            <input
                                type="number"
                                name="creditsPerMonth"
                                value={
                                    formData.creditsPerMonth
                                }
                                onChange={handleChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.creditsPerMonth
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`}
                            />

                            {errors.creditsPerMonth && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.creditsPerMonth}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Discount %
                            </label>

                            <input
                                type="number"
                                name="discount"
                                value={
                                    formData.discount
                                }
                                onChange={handleChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.discount
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`}
                            />
                            {errors.discount && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.discount}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Max Documents
                            </label>

                            <input
                                type="number"
                                min={1}
                                name="maxDocuments"
                                value={formData.features.maxDocuments}
                                onChange={handleFeatureChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors["features.maxDocuments"]
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`
                                }
                            />

                            {errors["features.maxDocuments"] && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors["features.maxDocuments"]}
                                </p>
                            )}
                        </div>

                        {/* DURATION */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Duration (Days)
                            </label>

                            <input
                                type="number"
                                name="durationInDays"
                                value={
                                    formData.durationInDays
                                }
                                onChange={handleChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.durationInDays
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`}
                            />

                            {errors.durationInDays && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.durationInDays}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Credit Reset Interval
                            </label>

                            <input
                                type="number"
                                name="creditResetIntervalInDays"
                                value={
                                    formData.creditResetIntervalInDays
                                }
                                onChange={handleChange}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                                ${errors.creditResetIntervalInDays
                                        ? "border-red-500"
                                        : "border-slate-300 focus:border-indigo-500"
                                    }`}
                            />
                            {errors.creditResetIntervalInDays && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.creditResetIntervalInDays}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* CHECKBOX */}
                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="interviewAccess"
                            checked={
                                formData.features
                                    .interviewAccess
                            }
                            onChange={
                                handleFeatureChange
                            }
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                        />

                        <label className="text-sm font-medium text-slate-700">
                            Interview Access
                        </label>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Plan"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditSubscriptionPlanModal;