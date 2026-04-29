import { useEffect } from "react";
import { useUserManagement } from "../../../hooks/useUserManagement";

const AdminUsersPage = () => {
  const { users, loading, getUsers } = useUserManagement();

  useEffect(() => {
    getUsers({ page: 1, limit: 10 });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Credits</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.subscriptionPlan}</td>
              <td>{user.credits}</td>
              <td>{user.isBlocked ? "Blocked" : "Active"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;