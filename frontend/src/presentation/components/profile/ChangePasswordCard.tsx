import React, { useState } from 'react';
import type { ProfileState } from '../../../types/profile';
import { useProfile } from '../../../hooks/useProfile';
import { useForm } from 'react-hook-form';
import { type ChangePasswordFormValues, changePasswordSchema } from '../../../lib/validation/profileValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';
import SectionCard from '../common/card/SectionCard';


type Props = {
    profile: ProfileState
};

const ChangePasswordCard: React.FC<Props> = ({ profile }) => {

    const { changingPassword, updatePassword } = useProfile();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (profile.profile?.accountType === "GOOGLE") {
        return null;
    }

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            await updatePassword(
                data.currentPassword,
                data.newPassword
            )

            toast.success("Password updated successfully");

            reset();
        } catch (error) {
            if (
                error instanceof Error
            ) {

                toast.error(error.message);

                return;
            }

            toast.error("Failed to change password.");
        }
    };


    const renderInput = (
        label: string,
        field: | "currentPassword" | "newPassword" | "confirmPassword",
        visible: boolean,
        toggle: () => void
    ) => (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>
            <div className='relative'>
                <Lock
                    className='absolute left-4 top-3.5 text-slate-400'
                    size={18}
                />
                <input
                    type={
                        visible
                            ? "text"
                            : "password"
                    }
                    {...register(field)}
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-12 outline-none transition focus:border-red-500"
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-4 top-3"
                >

                    {visible ? (
                        <EyeOff
                            size={18}
                        />
                    ) : (
                        <Eye
                            size={18}
                        />
                    )}

                </button>
            </div>

            {errors[field] && (
                <p className="mt-2 text-sm text-red-500">
                    {errors[field]?.message}
                </p>
            )}
        </div>
    );

    return (
        <SectionCard
            title="Change Password"
            description="Update your account password."
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-5'
            >
                {renderInput(
                    "Current Password",
                    "currentPassword",
                    showCurrent,
                    () =>
                        setShowCurrent(
                            !showCurrent
                        )
                )}

                {renderInput(
                    "New Password",
                    "newPassword",
                    showNew,
                    () =>
                        setShowNew(
                            !showNew
                        )
                )}

                {renderInput(
                    "Confirm Password",
                    "confirmPassword",
                    showConfirm,
                    () =>
                        setShowConfirm(
                            !showConfirm
                        )
                )}

                <button
                    type="submit"
                    disabled={
                        changingPassword
                    }
                    className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                    {changingPassword
                        ? "Updating..."
                        : "Change Password"}
                </button>
            </form>
        </SectionCard>
    )
}

export default ChangePasswordCard;
