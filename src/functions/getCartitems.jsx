import {supabase} from "./supabaseClient";


export default async function  getData (uid){
   
    try{
       
        const {data,error}= await supabase.from("Cart").select("shoesize,colorindex,quantity,shoes(*)")
        .eq("uid",uid).order("created_at",{ascending:false});
        if(error) throw error;
        return data;
    }catch(error){
        console.log(error.message);
        return [];
    }
   }