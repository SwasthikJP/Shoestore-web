
import { createClient } from "@supabase/supabase-js";


    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
   export const supabase= createClient(superbaseURL,supabaseapi);
 