import React, { useState, useEffect } from "react";
import Logo from "../assets/Nestify_Logo_Black_Cropped.png";
import RightImage from "../assets/RegisterPage.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../features/auth/authSlice";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BiSolidUserPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
  if (user) {
    console.log("🔍 Logged in user:", user); // 👉 Check this in browser console
    if (user.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }
}, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("⚠️ Please fill in both email and password");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  const handleGoogleLogin = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-4xl rounded-xl shadow-md bg-white overflow-hidden">
        {/* Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <img src={Logo} alt="Nestify Logo" className="h-18 w-auto mx-auto mb-6" />
          <h1 className="font-semibold text-3xl px-2 pb-6 font-mono flex items-center gap-2">
            <AiOutlineLogin /> Login
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg font-bold pl-10"
              />
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg font-bold pl-10"
              />
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xl text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-bold">❌ {error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "⏳ Logging in..." : (
                <span className="flex justify-center items-center gap-2">
                  <AiOutlineLogin /> Login
                </span>
              )}
            </button>

            <div className="my-4 flex flex-col items-center gap-2">
              <span className="text-gray-500 text-sm">Or login with</span>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("❌ Google Login Failed")}
              />
            </div>

            <p className="mt-6 text-left text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline flex items-center gap-1">
                <BiSolidUserPlus /> Register
              </a>
            </p>
          </form>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 max-h-[400px] md:max-h-full overflow-hidden">
          <img src={RightImage} alt="Login side" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
