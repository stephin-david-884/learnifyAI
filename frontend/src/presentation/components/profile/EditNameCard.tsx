import React, { useEffect } from 'react';
import type { UserProfile } from '../../../types/profile';
import { useProfile } from '../../../hooks/useProfile';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { updateProfileSchema, type UpdateProfileFormValues } from '../../../lib/validation/profileValidation';
import { zodResolver } from "@hookform/resolvers/zod"
import toast from 'react-hot-toast';
import SectionCard from '../common/card/SectionCard';


type Props = {
    profile: UserProfile
}

const EditNameCard: React.FC<Props> = ({ profile }) => {

    const { updateUserProfile, loading } = useProfile();

    const { checkAuth } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty },
    } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: profile.name,
        },
    });

    useEffect(() => {
        reset({
            name: profile.name,
        });
    }, [profile, reset]);

    const onSubmit = async (
        data: UpdateProfileFormValues
    ) => {
        try {
            await updateUserProfile(data.name);

            await checkAuth();

            toast.success("Profile updated successfully");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                return;
            }

            toast.error(
                "Failed to update profile."
            );
        }
    }

    return (
        <SectionCard 
            title='Edit Name'
            description='Update your display name.'
        >
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-5'
            >
                <div>
                    <label className='mb-2 block text-sm font-medium text-slate-700'>
                        Name
                    </label>
                    <input {...register("name")}
                            className='w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500'
                    />
                    {errors.name && (

                        <p className="mt-2 text-sm text-red-500">
                            {errors.name.message}
                        </p>

                    )}
                </div>

                <button
                    type='submit'
                    disabled={
                        loading ||
                        !isDirty
                    }
                    className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Save Changes"}

                </button>

            </form>

        </SectionCard>
    )
}

export default EditNameCard;
