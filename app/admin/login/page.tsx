"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-line bg-panel p-8"
      >
        <h1 className="font-display text-xl font-bold text-signalBright">
          Admin Sign In
        </h1>
        <p className="mt-1 text-sm text-mist">AyubowanDiJital dashboard</p>

        <label htmlFor="email" className="mt-6 block text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />

        <label htmlFor="password" className="mt-4 block text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-signal py-2.5 font-semibold text-ink transition hover:bg-signalBright disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
