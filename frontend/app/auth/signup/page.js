"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10  sm:mt-18"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl text-white">
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg mb-2 sm:mb-4">
              CS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Account</h2>
            <p className="text-white/60 mt-1 sm:mt-2 text-center text-sm sm:text-base">
              Join CozyStay to book great stays
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 sm:mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 sm:py-3 text-sm text-red-200 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-3 sm:space-y-5">
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs sm:text-sm font-medium text-white/80 ml-1"
              >
                Full Name
              </label>
              <div className="relative group mt-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-9 sm:pl-10 pr-4 py-[10px] sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium text-white/80 ml-1"
              >
                Email Address
              </label>
              <div className="relative group mt-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-9 sm:pl-10 pr-4 py-[10px] sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-medium text-white/80 ml-1"
                >
                  Password
                </label>
                <div className="relative group mt-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-9 sm:pl-10 pr-9 sm:pr-10 py-[10px] sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label
                  htmlFor="confirm"
                  className="text-xs sm:text-sm font-medium text-white/80 ml-1"
                >
                  Confirm
                </label>
                <div className="relative group mt-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <input
                    id="confirm"
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-9 sm:pl-10 pr-9 sm:pr-10 py-[10px] sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer mt-1 sm:mt-2"
            >
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Create Account
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]"
                    />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-4 sm:mt-8 text-center">
            <p className="text-white/60 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-300 font-medium hover:text-blue-200 hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
