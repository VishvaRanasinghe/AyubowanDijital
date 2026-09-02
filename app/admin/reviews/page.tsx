import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/lib/types";
import ReviewForm from "./ReviewForm";
import ReviewListButtons from "./ReviewListButtons";

export default async function AdminReviewsPage() {
  const supabase = createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Reviews</h1>

      <ReviewForm />

      <div className="mt-8 space-y-3">
        {(reviews as Review[] | null)?.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-lg border border-line bg-panel px-4 py-3"
          >
            <div>
              <p className="font-semibold">
                {r.client_name}{" "}
                <span className="text-signal">{"★".repeat(r.rating)}</span>
              </p>
              <p className="text-sm text-mist">{r.comment}</p>
              <p className="mt-1 text-xs text-mist">
                {r.published ? "Published" : "Hidden"}
              </p>
            </div>
            <ReviewListButtons id={r.id} published={r.published} />
          </div>
        ))}
        {(!reviews || reviews.length === 0) && (
          <p className="text-mist text-center p-8 border border-dashed border-line rounded-lg">No reviews yet — add the first one above.</p>
        )}
      </div>
    </div>
  );
}
