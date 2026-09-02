"use client";

import { useTransition } from "react";
import { deleteProject } from "./actions";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this project?")) {
          startTransition(async () => {
            const result = await deleteProject(id);
            if (result?.error) {
              alert(result.error);
            }
          });
        }
      }}
      disabled={isPending}
      className="text-sm text-red-300 hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded px-1"
      aria-label="Delete project"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
