import React, { useEffect } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';
import ProfileOverviewCard from '../../components/profile/ProfileOverviewCard';
import EditNameCard from '../../components/profile/EditNameCard';
import SubscriptionCard from '../../components/profile/SubscriptionCard';
import ChangePasswordCard from '../../components/profile/ChangePasswordCard';
import CancelSubscriptionCard from '../../components/profile/CancelSubscriptionCard';

const ProfilePage: React.FC = () => {

    const { profile, loading, error, fetchProfile } = useProfile();

    useEffect(() => {
        fetchProfile();
    },[fetchProfile]);

    useEffect(() => {
        if(error){
            toast.error(error);
        }
    },[error]);

    if(loading && !profile) {
        return (
            <div className='flex justify-center py-20'>
                <Spinner />
            </div>
        );
    }

    if(!profile) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                    Failed to load profile
                </h2>
            </div>
        )
    }

    return (
        <div className='mx-auto max-w-4xl space-y-8'>
            <div>
                <h1 className='text-3xl font-bold text-slate-900'>
                    My Profile
                </h1>
                <p className='mt-2 text-slate-500'>
                    Manage your account information and subscription
                </p>
            </div>
            <ProfileOverviewCard profile={profile}/>
            <EditNameCard profile={profile}/>
            <SubscriptionCard profile={profile}/>
            {profile.accountType === "EMAIL" && (
                <ChangePasswordCard profile={profile} />
            )}
            <CancelSubscriptionCard 
                hasActiveSubscription={
                    profile.subscription?.status === "ACTIVE"
                }
            />
        </div>
    )
}

export default ProfilePage;
