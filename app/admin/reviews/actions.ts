"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createReview(prevState: any, formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.from("reviews").insert({
    client_name: String(formData.get("client_name") ?? ""),
    rating: Number(formData.get("rating") ?? 5),
    comment: String(formData.get("comment") ?? ""),
    published: true,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  
  return { success: true };
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from("reviews")
    .update({ published: !published })
    .eq("id", id);
    
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  
  return { success: true };
}

export async function deleteReview(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  
  return { success: true };
}
