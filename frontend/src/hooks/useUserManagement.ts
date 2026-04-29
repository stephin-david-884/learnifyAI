import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchUsers, toggleUserBlockStatus } from "../redux/features/admin/userManagementSlice";

export const useUserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error, page, limit, total } = useSelector(
    (state: RootState) => state.userManagement
  );

  const getUsers = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    return dispatch(fetchUsers(params)).unwrap();
  };

  const toggleBlockUser = async (data: {
    userId: string;
    action: "BLOCK" | "UNBLOCK";
  }) => {
    return dispatch(toggleUserBlockStatus(data)).unwrap();
  };

  return {
    users,
    loading,
    error,
    page,
    limit,
    total,
    getUsers,
    toggleBlockUser
  };
};