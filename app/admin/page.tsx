import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createClient();

  const [{ count: projectCount }, { count: reviewCount }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-mist">Quick overview of your site content.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-panel p-6">
          <p className="text-sm text-mist">Projects</p>
          <p className="mt-1 font-display text-3xl font-bold text-signalBright">
            {projectCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-panel p-6">
          <p className="text-sm text-mist">Reviews</p>
          <p className="mt-1 font-display text-3xl font-bold text-signalBright">
            {reviewCount ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
