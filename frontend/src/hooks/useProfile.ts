import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store";
import { cancelSubscription, changePassword, clearProfileError, getProfile, updateProfile } from "../redux/features/profile/profileSlice";

export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        profile,
        loading,
        updatingProfile,
        changingPassword,
        cancellingSubscription,
        error
    } = useSelector((state: RootState) => state.profile);

    const clearError = () => {
        dispatch(clearProfileError());
    };

    const fetchProfile = async () => {
        return dispatch(getProfile()).unwrap();
    };

    const updateUserProfile = async (name: string) => {
        return dispatch(updateProfile({name})).unwrap();
    };

    const updatePassword = async (currentPassword: string, newPassword: string) => {
        return dispatch(changePassword({currentPassword, newPassword})).unwrap();
    };

    const cancelUserSubscription = async () => {
        return dispatch(cancelSubscription()).unwrap();
    };

    return {
        profile,
        loading,
        updatingProfile,
        changingPassword,
        cancellingSubscription,
        error,
        clearError,
        fetchProfile,
        updateUserProfile,
        updatePassword,
        cancelUserSubscription,
    }
}