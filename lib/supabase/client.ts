import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}