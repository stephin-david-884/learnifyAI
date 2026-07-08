import React, { useState } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import toast from 'react-hot-toast';
import SectionCard from '../common/card/SectionCard';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';

type Props = {
    hasActiveSubscription: boolean;
}

const CancelSubscriptionCard: React.FC<Props> = ({ hasActiveSubscription }) => {

    const { cancelUserSubscription, cancellingSubscription, fetchProfile } = useProfile();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!hasActiveSubscription) {
        return null;
    }

    const handleConfirm = async () => {
        try {
            await cancelUserSubscription();
            await fetchProfile();
            toast.success("Subscription cancelled successfully");
            setDialogOpen(false);
        } catch (error) {
            toast.error(error instanceof Error
                ? error.message
                : "Failed to cancel subscription"
            );
        }
    }


    return (
        <>
            <SectionCard
                title='Cancel Subscription'
                description='This action cannot be undone'
            >
                <div className='rounded-2xl border border-red-200 bg-red-50 p-5'>
                    <p className='text-sm leading-6 text-red-700'>
                        Cancelling your subscription will immediately move your
                        account back to the FREE plan. Any unused subscription
                        credits will be lost.
                    </p>
                    <button
                        onClick={() => setDialogOpen(true)}
                        disabled={cancellingSubscription}
                        className='mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                        {cancellingSubscription
                            ? "Cancelling..."
                            : "Cancel Subscription"
                        }
                    </button>
                </div>
            </SectionCard>
            <ConfirmDialog
                open={dialogOpen}
                title="Cancel Subscription"
                description="Are you sure you want to cancel your subscription? Your account will immediately switch back to the FREE plan."
                confirmText="Cancel Subscription"
                cancelText="Keep Subscription"
                danger
                loading={cancellingSubscription}
                onCancel={() => setDialogOpen(false)}
                onConfirm={handleConfirm}        
            />
        </>
    )
}

export default CancelSubscriptionCard;
