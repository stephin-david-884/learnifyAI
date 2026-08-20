import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { ZodError } from "zod";

import type {
  AppDispatch,
  RootState,
} from "../../../redux/store";

import {
  resetPassword,
} from "../../../redux/features/auth/authSlice";

import {
  resetPasswordSchema,
} from "../../../lib/validation/authValidation";

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

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {

    if (!email || !resetToken) {

      toast.error(
        "Session expired. Please try again."
      );

      navigate("/forgot-password");
    }

  }, [email, resetToken, navigate]);

  const validate = () => {

    try {

      resetPasswordSchema.parse({
        email,
        resetToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setErrors({});

      return true;

    } catch (err) {

      if (err instanceof ZodError) {

        const formatted: Record<
          string,
          string
        > = {};

        err.issues.forEach((issue) => {

          const field = issue.path[0];

          if (typeof field === "string") {

            formatted[field] =
              issue.message;
          }

        });

        setErrors(formatted);

      }

      return false;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {

      const result = await dispatch(
        resetPassword({
          email,
          resetToken,
          newPassword:
            formData.newPassword,
          confirmPassword:
            formData.confirmPassword,
        })
      ).unwrap();

      toast.success(result.message);

      navigate("/login");

    } catch (err) {

      toast.error(
        err as string
      );
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-md"
      >

        <h2 className="text-center text-xl font-semibold">
          Reset Password
        </h2>

        {/* New Password */}

        <div>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              className={`w-full rounded-lg border px-4 py-2 pr-11 ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={
                formData.newPassword
              }
              onChange={(e) => {

                setFormData({
                  ...formData,
                  newPassword:
                    e.target.value,
                });

                if (errors.newPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    newPassword: "",
                  }));
                }

              }}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >

              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}

            </button>

          </div>

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword}
            </p>
          )}

        </div>

        {/* Confirm Password */}

        <div>

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              className={`w-full rounded-lg border px-4 py-2 pr-11 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={
                formData.confirmPassword
              }
              onChange={(e) => {

                setFormData({
                  ...formData,
                  confirmPassword:
                    e.target.value,
                });

                if (
                  errors.confirmPassword
                ) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                }

              }}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >

              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}

            </button>

          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}

        </div>

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black py-2 text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;