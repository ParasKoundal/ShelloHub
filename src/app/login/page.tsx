"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setPassword("");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
      <div className="w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-600/20">
            <Terminal className="w-7 h-7 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100">Shello Hub</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d37] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-gray-500" />
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-400"
              >
                Dashboard Password
              </label>
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-4 py-3 rounded-lg text-sm bg-white/5 text-gray-200
                border outline-none transition-colors
                placeholder-gray-600
                ${
                  error
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                }`}
            />

            {error && (
              <p className="mt-2 text-sm text-red-400">Wrong password</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full mt-4 py-3 rounded-lg text-sm font-medium transition-colors
                bg-blue-600 hover:bg-blue-500 text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
