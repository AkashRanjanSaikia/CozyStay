"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../../context/usercontext";
import Link from "next/link";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-700 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-6 sm:p-8 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-white/80 flex items-center justify-center text-blue-600 font-bold">
              W
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-white/80">
                Sign in to continue to CozyStay
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 rounded-md bg-red-900/30 border border-red-700/30 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/8 border border-white/10 text-white placeholder-white/60 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/8 border border-white/10 text-white placeholder-white/60 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-white/80">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded bg-white/8" />
                <span>Remember me</span>
              </label>

              <a href="#" className="hover:underline">
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 px-4 py-2.5 rounded-full text-white font-semibold disabled:opacity-60"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* <h2>Or</h2>

          <div className="mt-3 ">
            <button
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-white/8 hover:bg-white/12 border border-white/6 text-white"
              aria-label="Continue with Google"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.35 11.1H12v2.8h5.35c-.25 1.4-1 2.6-2.15 3.4v2.8h3.45c2-1.85 3.15-4.6 3.15-8 0-.7-.06-1.35-.1-1.5z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm">Continue with Google</span>
            </button>
          </div> */}

          <p className="mt-4 text-center text-sm text-white/80">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-300 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
