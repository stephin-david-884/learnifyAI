import React from 'react';
import SectionCard from '../common/card/SectionCard';
import type { UserProfile } from '../../../types/profile';
import { Mail, Shield, User } from 'lucide-react';

type Props = {
    profile: UserProfile
};

const ProfileOverviewCard: React.FC<Props> = ({profile}) => {
    return (
        <SectionCard
            title='Account Information'
            description='Your basic account details'
        >
            <div className='space-y-6'>
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100">
                        <User className="h-5 w-5 text-red-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">
                            Name
                        </p>
                        <p className="font-medium text-slate-900">
                            {profile.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100">
                        <Mail className="h-5 w-5 text-indigo-500"/>
                    </div>

                    <div className="text-sm text-slate-500">
                        <p className="text-sm text-slate-500">
                            Email
                        </p>
                        <p className="font-medium text-slate-900">
                            {profile.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <Shield className="h-5 w-5 text-emerald-500"/>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">
                            Account Type
                        </p>
                        <p className="font-medium text-slate-900">
                            {profile.accountType}
                        </p>
                    </div>
                </div>
            </div>

        </SectionCard>
    )
}

export default ProfileOverviewCard;
