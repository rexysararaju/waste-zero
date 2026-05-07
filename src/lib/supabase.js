import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
// this file initializes the supabase client with the URL and anon key from environment variables, 
// and exports it for use in other parts of the app.
// this is our serverless backend, it provides authentication and database services
//  without us having to manage our own server.