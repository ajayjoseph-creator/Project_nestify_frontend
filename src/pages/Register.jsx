import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Nestify_Logo_Black_Cropped.png";
import RightImage from "../assets/RegisterPage.png";
import { useNavigate } from "react-router-dom";
import { registerUser, sendOtp } from "../features/auth/authSlice";

import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaCheckCircle, FaRedo } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, otp, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      toast.success("🎉 Registered successfully!");
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("❌ Passwords do not match");
    }
    const result = await dispatch(sendOtp(email));
    if (sendOtp.fulfilled.match(result)) {
      toast.info("📧 OTP sent to email");
      setStep(2);
    } else {
      toast.error(result.payload || "⚠️ Failed to send OTP");
    }
  };

  const handleVerifyOtp = () => {
    if (userOtp.trim() !== otp?.toString()) {
      return toast.warning("❌ Incorrect OTP");
    }
    dispatch(registerUser({ name, email, password, confirmPassword }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <img src={Logo} alt="Logo" className="h-18 w-auto mx-auto mb-6" />
          <h1 className="font-semibold text-3xl px-2 pb-6 font-mono flex items-center gap-2">
            <FaUser /> Register
          </h1>

          {loading && (
            <p className="text-sm text-gray-500 mb-4">⏳ Please wait...</p>
          )}

          {step === 1 && (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 pl-10 border rounded-lg font-bold"
                  required
                />
                <FaUser className="absolute top-3 left-3 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 border rounded-lg font-bold"
                  required
                />
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pl-10 border rounded-lg font-bold"
                  required
                />
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xl"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 pl-10 border rounded-lg font-bold"
                  required
                />
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-xl"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-bold">❗ {error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <AiOutlineSend /> Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  className="w-full p-2 pl-10 border rounded-lg font-bold"
                />
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <FaCheckCircle /> Verify OTP & Register
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(sendOtp(email));
                }}
                className="text-blue-600 text-sm flex items-center gap-1"
              >
                <FaRedo /> Resend OTP
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:flex md:w-1/2">
          <img
            src={RightImage}
            alt="Register"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
