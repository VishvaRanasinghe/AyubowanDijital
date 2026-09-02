"use client";

import { useTransition } from "react";
import { deleteReview, togglePublished } from "./actions";

export default function ReviewListButtons({ id, published }: { id: string, published: boolean }) {
  const [isPendingPublish, startTransitionPublish] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => {
          startTransitionPublish(async () => {
            const result = await togglePublished(id, published);
            if (result?.error) alert(result.error);
          });
        }}
        disabled={isPendingPublish}
        className="text-sm text-signalBright hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1"
        aria-label={published ? "Hide review" : "Publish review"}
      >
        {isPendingPublish ? "..." : (published ? "Hide" : "Publish")}
      </button>

      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this review?")) {
            startTransitionDelete(async () => {
              const result = await deleteReview(id);
              if (result?.error) alert(result.error);
            });
          }
        }}
        disabled={isPendingDelete}
        className="text-sm text-red-300 hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded px-1"
        aria-label="Delete review"
      >
        {isPendingDelete ? "..." : "Delete"}
      </button>
    </div>
  );
}
