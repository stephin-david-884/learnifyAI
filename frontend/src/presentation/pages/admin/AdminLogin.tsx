import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../lib/validation/authValidation";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { adminLogin } from "../../../redux/features/admin/adminSlice";

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.admin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Validation (same pattern as user auth)
  const validate = () => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted: Record<string, string> = {};

        err.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === "string") {
            formatted[field] = issue.message;
          }
        });

        setErrors(formatted);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await dispatch(adminLogin(formData));

    if (adminLogin.fulfilled.match(result)) {
      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Admin Panel
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Secure access only
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Admin Email"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:ring-black"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:ring-black"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;