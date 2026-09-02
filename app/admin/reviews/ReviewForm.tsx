"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createReview } from "./actions";
import { useRef, useEffect } from "react";

type State = {
  error?: string;
  success?: boolean;
};

const initialState: State = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="sm:col-span-2 rounded-full bg-signal py-2.5 font-semibold text-ink hover:bg-signalBright disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
    >
      {pending ? "Adding..." : "Add Review"}
    </button>
  );
}

export default function ReviewForm() {
  const [state, formAction] = useFormState(createReview, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 grid gap-4 rounded-xl border border-line bg-panel p-6 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="client_name" className="text-sm font-medium">Client Name</label>
        <input
          id="client_name"
          name="client_name"
          placeholder="Client name"
          required
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rating" className="text-sm font-medium">Rating</label>
        <select
          id="rating"
          name="rating"
          defaultValue="5"
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="comment" className="text-sm font-medium">Review Text</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Review text"
          required
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
          rows={3}
        />
      </div>

      {state?.error && (
        <p className="sm:col-span-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
