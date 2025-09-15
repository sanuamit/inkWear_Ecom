//src/pages/profile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, getUserProfile } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(updateUserProfile({ name, email, password }));
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        {message || "Error loading profile"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Update Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/order-history"
                className="text-indigo-500 hover:underline"
              >
                View Order History
              </Link>
            </li>
            <li>
              <Link
                to="/design-uploader"
                className="text-indigo-500 hover:underline"
              >
                Upload New Design
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-indigo-500 hover:underline"
              >
                View Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
