import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { verifyForgotPasswordOtp } from "../../../redux/features/auth/authSlice";

const VerifyForgotOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      return toast.error("Enter complete OTP");
    }

    try {
      const result = await dispatch(
        verifyForgotPasswordOtp({
          email,
          otp: otpValue,
        })
      ).unwrap();

      toast.success(result.message);

      navigate("/reset-password", {
        state: {
          email: result.email,
          resetToken: result.resetToken,
        },
      });
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-500">
          Enter OTP sent to {email}
        </p>

        <div className="flex gap-2 justify-center">
          {otp.map((val, i) => (
            <input
              key={i}
              ref={(el) => {(inputRef.current[i] = el)}}
              maxLength={1}
              className="w-10 h-12 text-center border rounded-lg"
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyForgotOtp;