import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { loginSchema, registerSchema } from '../../../lib/validation/authValidation';
import { ZodError } from 'zod';
import { googleLogin, registerUser } from '../../../redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

interface Props {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  //validation
  const validate = () => {
    try {
      if (mode === "signup") {
        registerSchema.parse(formData);
      } else {
        loginSchema.parse({ email: formData.email, password: formData.password });
      }

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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (mode === "signup") {
      const result = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(result)) {
        toast.success("OTP sent to your email");

        navigate("/verifyotp", {
          state: { email: formData.email },
        });
      } else {
        toast.error(result.payload || "Registration failed");
      }
    } else {

      toast("Login coming next ");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google login failed");
        return;
      }

      const result = await dispatch(
        googleLogin({ idToken: credentialResponse.credential })
      );

      if (googleLogin.fulfilled.match(result)) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(result.payload || "Google login failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      <div className='mt-4 flex justify-center'>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        {mode === "signup" && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border rounded-lg px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded-lg px-4 py-2 ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        {mode === "signup" && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border rounded-lg px-4 py-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : mode === "login"
              ? "Login"
              : "Register"}
        </button>
      </form>

      {/* Switch */}
      <p className="text-sm text-center mt-4">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  )
}

export default AuthForm
