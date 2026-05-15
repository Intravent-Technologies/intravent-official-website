import { getSupabase } from "@/lib/supabase";

function keyFromFilename(filename: string): string {
  return filename.replace(/\.json$/, "");
}

export async function readData<T>(filename: string): Promise<T[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const key = keyFromFilename(filename);
  if (key === "newsletter" || key === "contacts") {
    const { data, error } = await supabase
      .from(key)
      .select("*")
      .order("date", { ascending: false });
    if (error) {
      console.error(`readData(${filename}) error:`, error);
      return [];
    }
    return (data as T[]) || [];
  }
  const { data, error } = await supabase
    .from("site_data")
    .select("value")
    .eq("key", key)
    .single();
  if (error || !data) {
    console.error(`readData(${filename}) error:`, error);
    return [];
  }
  return (data.value as T[]) || [];
}

export async function writeData<T>(filename: string, items: T[]): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("Supabase not configured — write skipped");
    return;
  }

  const key = keyFromFilename(filename);
  if (key === "newsletter" || key === "contacts") {
    console.warn(`Direct write to ${key} not supported via writeData. Use the API routes.`);
    return;
  }
  const { error } = await supabase
    .from("site_data")
    .upsert({ key, value: items, updated_at: new Date().toISOString() });
  if (error) {
    console.error(`writeData(${filename}) error:`, error);
  }
}
