import React from 'react';
import type { UserProfile } from '../../../types/profile';
import SectionCard from '../common/card/SectionCard';
import { BadgeCheck, Calendar, Coins, CreditCard } from 'lucide-react';

type Props = {
    profile: UserProfile
}

const SubscriptionCard: React.FC<Props> = ({ profile }) => {

    const subscription = profile.subscription;

    if (!subscription) {
        return (
            <SectionCard
                title='Subscription'
                description='Your current subscription.'
            >
                <p className='text-sm text-slate-500'>
                    You are currently using FREE PLAN
                </p>

            </SectionCard>
        );
    }

    const items = [
        {
            label: "Plan",
            value: subscription.planName,
            icon: CreditCard,
        },
        {
            label: "Status",
            value: subscription.status,
            icon: BadgeCheck,
        },
        {
            label: "Billing Cycle",
            value: subscription.billingCycle,
            icon: Calendar,
        },
        {
            label: "Credits",
            value: `${subscription.creditsRemaining} / ${subscription.creditsTotal}`,
            icon: Coins,
        },
        {
            label: "Started",
            value: new Date(
                subscription.startDate
            ).toLocaleDateString(),
            icon: Calendar,
        },
        {
            label: "Expires",
            value: new Date(
                subscription.endDate
            ).toLocaleDateString(),
            icon: Calendar,
        },
    ]

    return (
        <SectionCard
            title="Subscription"
            description="Manage your current subscription."
        >
            <div className="grid gap-5 md:grid-cols-2">

                {items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.label}
                            className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">

                                <Icon
                                    size={18}
                                    className="text-red-500"
                                />

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">
                                    {item.label}
                                </p>

                                <p className="font-semibold text-slate-900">
                                    {item.value}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </SectionCard>
    )
}

export default SubscriptionCard
