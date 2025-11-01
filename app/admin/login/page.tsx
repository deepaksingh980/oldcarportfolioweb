"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { MotionForm, MotionButton } from "../../components/MotionElements";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", { email, password });
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:to-gray-900 text-white px-4">
      <MotionForm
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-md space-y-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-vintageGold mb-2">
            Admin Login
          </h1>
          <p className="text-sm text-gray-300">
            Access your admin dashboard securely
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-vintageGold outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-vintageGold outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-vintageGold transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* ✅ Fixed motion.button closing tag */}
        <MotionButton
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-vintageGold text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Login
            </>
          )}
        </MotionButton>

        <p className="text-center text-gray-400 text-sm pt-2">
          © {new Date().getFullYear()} Old Car Portfolio
        </p>
      </MotionForm>
    </div>
  );
}
