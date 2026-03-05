import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET - ambil semua reviews
// GET - ambil semua reviews
export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - simpan review baru
export async function POST(req: Request) {
  const body = await req.json();
  const { name, message, rating } = body;

  if (!name || !message || !rating) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([{ name, message, rating }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}