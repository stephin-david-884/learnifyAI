import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchUsers } from "../redux/features/admin/userManagementSlice";

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

  return {
    users,
    loading,
    error,
    page,
    limit,
    total,
    getUsers,
  };
};