// src/pages/admin/UserManager.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserRole, deleteUser } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";

const UserManager = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (isLoading) return <Loader fullScreen />;

  if (isError) return <div className="p-6 text-center text-red-500">{message}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Manager</h1>

      {users && users.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">User</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Role</th>
                <th className="py-3 px-4 border-b text-left">Joined</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                      {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{u.name || "—"}</div>
                      <div className="text-sm text-gray-500">{u.phone || ""}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b text-gray-700">{u.email}</td>

                  <td className="py-3 px-4 border-b">
                    <select
                      value={u.role || "user"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                    </select>
                  </td>

                  <td className="py-3 px-4 border-b text-gray-600">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>

                  <td className="py-3 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default UserManager;
