export const generateOtpTemplate = (otp: string, name?: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello ${name || "User"},</h2>
      <p>Your OTP for registration is:</p>
      <h1 style="color: #4CAF50;">${otp}</h1>
      <p>This OTP will expire in 2 minutes.</p>
      <br/>
      <p>If you didn’t request this, please ignore.</p>
    </div>
  `;
};