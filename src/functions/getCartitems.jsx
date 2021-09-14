import {supabase} from "./supabaseClient";


export default async function  getData (uid){
   
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