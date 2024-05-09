import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ybdxfeeyrsjflnktyotw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZHhmZWV5cnNqZmxua3R5b3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MDgzNTUsImV4cCI6MjAzMDQ4NDM1NX0.gHZehK69lzhnJn8w8pwZPj6WERmedwcdF9e5gHPMM_U"
);
