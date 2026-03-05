import { supabase } from "./supabase";

export async function getReviews() {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return data;
}