"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function createProject(prevState: any, formData: FormData) {
  const supabase = createClient();
  const adminClient = createAdminClient();

  let finalImageUrl = null;
  const imageFile = formData.get("image") as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await adminClient.storage
      .from("project-images")
      .upload(fileName, imageFile);
      
    if (uploadError) {
      return { error: `Failed to upload image: ${uploadError.message}` };
    }
    
    const { data: { publicUrl } } = adminClient.storage
      .from("project-images")
      .getPublicUrl(fileName);
      
    finalImageUrl = publicUrl;
  }

  const { error } = await supabase.from("projects").insert({
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    description: String(formData.get("description") ?? ""),
    image_url: finalImageUrl,
    link: String(formData.get("link") ?? "") || null,
    featured: formData.get("featured") === "on",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}
