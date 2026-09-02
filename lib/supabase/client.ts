import { createBrowserClient } from "@supabase/ssr";

// Use this inside Client Components ("use client" files).
// Reads from the two public, browser-safe env vars.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
