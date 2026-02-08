"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../context/usercontext";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser?.(data.user);
        router.push("/hotels");
      } else {
        setError(
          data?.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-6 sm:py-8 relative overflow-hidden">
      {/* Background blobs for visual interest */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10  sm:mt-12"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4">
              CS
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-white/60 mt-2 text-center">
              Sign in to continue your journey with CozyStay
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80 ml-1 "
              >
                Email Address
              </label>
              <div className="relative group mt-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/80"
                >
                  Password
                </label>
                
              </div>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-white/40 rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-xs text-blue-300 hover:text-blue-200 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            

            {/* <div className="flex items-center gap-2 ml-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500/40 focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-sm text-white/70 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-300 font-medium hover:text-blue-200 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
