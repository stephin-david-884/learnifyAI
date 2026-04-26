import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { resetPassword } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!email || !resetToken) {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
    }
  }, [email, resetToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const result = await dispatch(
        resetPassword({
          email,
          resetToken,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();

      toast.success(result.message);

      navigate("/login");
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded-lg"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              newPassword: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border px-4 py-2 rounded-lg"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;