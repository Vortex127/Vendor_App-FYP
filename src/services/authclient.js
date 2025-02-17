import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hewtthcxwprunyvxtqms.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhld3R0aGN4d3BydW55dnh0cW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NzM1NDAsImV4cCI6MjA1NTM0OTU0MH0.9iViLsrB0JXS16nGWXnW9U0ZvnX2a8sY-JT41g-w5PU";
export const supabase = createClient(supabaseUrl, supabaseKey);
