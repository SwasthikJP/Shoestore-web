import { useEffect, useState } from "react/cjs/react.development";
import { useGetcontext } from "../custom_hooks/getcontext";
import Footern from "./footer";
import Navbar from "./navbar";
import { Link ,Redirect} from "react-router-dom";
import  {supabase} from '../functions/supabaseClient';


export default function Favourite(){

const [listdata,setlistdata]=useState([]);
const {uid,checkUser}=useGetcontext();

 useEffect(async()=>{
  try{
   const Uid=checkUser();
    const {data,error}=await supabase.from("Favourites").select(`colorindex,shoes(*)`).match({
        uid:Uid
    });
    if(error) throw error;
    console.log(data)
    let a=data.map((ele)=>{
        return {colorindex:ele.colorindex,...ele.shoes};
    });
    console.log(a)
    setlistdata(a);
    
  }catch(err){
      console.log(err);
  }
 },[]);



    return <div>
        <Navbar signactive={false} signIn />
        <h3 style={{margin:"1rem 0 0 1rem"}}>Favourite</h3>
        <div className="shoelistbody" style={{padding:"1rem",overflowY:"auto"}}>
        {console.log("==== fav ====")}
{listdata.length!==0?
listdata.map((ele,index)=>{


return  <Link key={index} to={`/details/${ele.gender}'s-${ele.shoename.replace(/ /g,"-")}/${ele.id}/${ele.colorindex}`} className="norbox norbox_fav"   data-key="0" >
    <div className="image">
    <img   src={ele.shoeimages[ele.shoecolors[ele.colorindex]]} alt="" />
    </div>
    <div className="details">
        <p>{ele.shoename}</p>
        <p className="subdetail">{ele.shoetype} shoe</p>
      
    </div>

    <p>₹{ele.shoecost}</p>

 </Link>
 }):<h3 style={{margin:"25vh auto",textTransform:"none"}}>Items added to your Favourites will be saved here.</h3>
}
 </div>

        <Footern />
    </div>
}