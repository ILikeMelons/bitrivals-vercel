import { createClient } from "@supabase/supabase-js"

// retrieving environment variables
const supabase = createClient(
    'https://kimrsfhztfloqxuxwadd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTk2MjA4NiwiZXhwIjoxOTUxNTM4MDg2fQ.fODbp1RTvppi-f0x2vaeeq6nuZfjdK-XNfXeha3unu8'
)


export {supabase}