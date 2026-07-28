import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://gsnjauixpjjmmbzplbtn.supabase.co";
const supabaseAnonKey = "sb_publishable_srvv3dn6GNhwvbcollE4EA_Q3DlaRia";

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);