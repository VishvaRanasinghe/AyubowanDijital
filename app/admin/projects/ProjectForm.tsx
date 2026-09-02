"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createProject } from "./actions";
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
      {pending ? "Adding..." : "Add Project"}
    </button>
  );
}

export default function ProjectForm() {
  const [state, formAction] = useFormState(createProject, initialState);
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
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Title"
          required
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <input
          id="category"
          name="category"
          placeholder="Category (e.g. Technology)"
          required
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />
      </div>
      
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
          rows={3}
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="text-sm font-medium">Project Image</label>
        <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-signal file:text-ink hover:file:bg-signalBright"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="link" className="text-sm font-medium">Link</label>
        <input
          id="link"
          name="link"
          placeholder="Link (optional)"
          className="rounded-lg border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signalBright"
        />
      </div>
      
      <div className="sm:col-span-2 flex items-center gap-2">
        <input 
          type="checkbox" 
          id="featured" 
          name="featured" 
          className="focus-visible:ring-2 focus-visible:ring-signalBright outline-none"
        />
        <label htmlFor="featured" className="text-sm text-mist">
          Feature this project
        </label>
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
