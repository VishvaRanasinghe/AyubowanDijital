import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import type { Project } from "@/lib/types";
import ProjectForm from "./ProjectForm";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Projects</h1>

      {/* Add new project */}
      <ProjectForm />

      {/* Existing projects */}
      <div className="mt-8 space-y-3">
        {(projects as Project[] | null)?.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-line bg-panel px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {p.image_url && (
                <img src={p.image_url} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover border border-line" />
              )}
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-mist">{p.category}</p>
              </div>
            </div>
            <DeleteProjectButton id={p.id} />
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="text-mist text-center p-8 border border-dashed border-line rounded-lg">No projects yet — add your first one above.</p>
        )}
      </div>
    </div>
  );
}
