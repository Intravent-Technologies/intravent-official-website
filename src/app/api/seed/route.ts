import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson(filename: string) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export async function POST() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const results: Record<string, string> = {};

  const tables: Record<string, string> = {
    "services.json": "services",
    "clients.json": "clients",
    "portfolio.json": "portfolio",
    "blog.json": "blog",
    "team.json": "team",
  };

  for (const [file, key] of Object.entries(tables)) {
    const data = readJson(file);
    const { error } = await supabase
      .from("site_data")
      .upsert({ key, value: data, updated_at: new Date().toISOString() });
    results[key] = error
      ? `Error: ${error.message}`
      : `Seeded ${data.length} items`;
  }

  // Seed newsletter
  const newsletterData = readJson("newsletter.json");
  for (const item of newsletterData) {
    const { error } = await supabase
      .from("newsletter")
      .upsert({ email: item.email, date: item.date || new Date().toISOString() });
    if (error) console.error("newsletter seed error:", error.message);
  }
  results["newsletter"] = `Seeded ${newsletterData.length} items`;

  // Seed contacts
  const contactsData = readJson("contacts.json");
  for (const item of contactsData) {
    const { error } = await supabase
      .from("contacts")
      .insert({ name: item.name, email: item.email, company: item.company || "", message: item.message, date: item.date || new Date().toISOString() });
    if (error) console.error("contacts seed error:", error.message);
  }
  results["contacts"] = `Seeded ${contactsData.length} items`;

  return NextResponse.json({ success: true, results });
}
