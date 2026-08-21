import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import {
  
  resendForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "../../../redux/features/auth/authSlice";

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 120;

const VerifyForgotOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email as string | undefined;

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((previousOtp) => {
      const newOtp = [...previousOtp];
      newOtp[index] = value;

      return newOtp;
    });

    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key !== "Backspace") return;

    if (otp[index]) {
      setOtp((previousOtp) => {
        const newOtp = [...previousOtp];
        newOtp[index] = "";

        return newOtp;
      });

      return;
    }

    if (index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const pastedOtp = pastedValue.split("");

    setOtp([
      ...pastedOtp,
      ...Array(OTP_LENGTH - pastedOtp.length).fill(""),
    ]);

    const focusIndex = Math.min(
      pastedOtp.length,
      OTP_LENGTH - 1
    );

    inputRef.current[focusIndex]?.focus();
  };

  const handleResendOtp = async () => {
    if (!email) return;

    try {
      const result = await dispatch(
        resendForgotPasswordOtp({ email })
      ).unwrap();

      toast.success(result.message);

      setOtp(Array(OTP_LENGTH).fill(""));
      setTimeLeft(OTP_EXPIRY_SECONDS);

      inputRef.current[0]?.focus();
    } catch (err) {
      toast.error(err as string);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) return;

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      toast.error("Enter complete OTP");
      return;
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
        replace: true,
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
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRef.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 text-center border rounded-lg text-lg"
              value={value}
              onChange={(event) =>
                handleChange(event.target.value, index)
              }
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              onPaste={handlePaste}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-600">
          Time left:{" "}
          <span className="font-semibold">
            {formatTime(timeLeft)}
          </span>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {timeLeft === 0 && (
          <div className="text-center text-sm">
            Didn't receive OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="text-blue-600 underline disabled:opacity-50"
            >
              Resend
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyForgotOtp;