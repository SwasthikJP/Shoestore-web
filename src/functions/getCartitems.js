import { createClient } from "@supabase/supabase-js";
import { useGetcontext } from "./getcontext";



export default async function  getData (uid){
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
    try{
        const {data,error}= await supabase.from("Cart").select("shoesize,colorindex,quantity,shoes(*)")
        .eq("uid",uid);
        if(error) throw error;
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return [];
    }
   }