import { createClient } from "@supabase/supabase-js"

// retrieving environment variables
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
)


export {supabase}