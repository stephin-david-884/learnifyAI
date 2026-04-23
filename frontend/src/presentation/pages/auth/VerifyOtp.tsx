import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { clearError, verifyOtp } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

const VerifyOtp: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(120);

    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error, registerEmail, resendOtp } = useAuth();

    useEffect(() => {
        if (!registerEmail) {
            navigate("/register");
        }

        return () => {
            dispatch(clearError());
        };
    }, [registerEmail, navigate, dispatch]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRef.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasteData)) return;

        const newOtp = pasteData.split("");
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

        inputRef.current[Math.min(pasteData.length, 5)]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const otpValue = otp.join("");

        if (otpValue.length < 6) {
            return toast.error("Enter complete OTP");
        }

        const result = await dispatch(
            verifyOtp({
                email: registerEmail!,
                otp: otpValue,
            })
        );

        if (verifyOtp.fulfilled.match(result)) {
            toast.success("Account verified successfully");
            navigate("/dashboard");
        } else {
            toast.error(result.payload || "Invalid OTP");
        }
    };

    const handleResendOtp = async () => {
        if (!registerEmail) return;

        try {
            await resendOtp(registerEmail);
            toast.success("OTP resent successfully");
            setTimeLeft(120);
        } catch (error) {
            toast.error(error as string);
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
                    Enter OTP sent to {registerEmail}
                </p>

                <div className="flex gap-2 justify-center">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(el) => { (inputRef.current[index] = el) }}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            className="w-10 h-12 text-center border rounded-lg text-lg"
                        />
                    ))}
                </div>

                <p className="text-center text-sm text-gray-600">
                    Time left: <span className="font-semibold">{formatTime(timeLeft)}</span>
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
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
                            className="text-blue-600 underline"
                        >
                            Resend
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default VerifyOtp;