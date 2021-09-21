import { useEffect, useState } from "react";
import { useGetcontext } from "../custom_hooks/getcontext";
import Footern from "./footer";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import  {supabase} from '../functions/supabaseClient';
import { IKImage } from "imagekitio-react";


export default function Favourite(){

const [shoedata,setshoedata]=useState([]);
const {uid}=useGetcontext();

 useEffect(()=>{
     async function fetchData(){
  try{
    const {data,error}=await supabase.from("Favourites").select(`colorindex,shoes(*)`).match({
        uid
    }).order("created_at",{ascending:false});
    if(error) throw error;
    setshoedata(data.map((ele)=>{
        return {...ele.shoes,colorindex:ele.colorindex};
    }));
    
  }catch(err){
      console.log(err.message);
  }
     }
     fetchData();
 },[uid]);



    return <div>
        <Navbar signactive={false} signIn />
        <h3 style={{margin:"1rem 0 0 1rem"}}>Favourite</h3>
        <div className="shoelistbody" style={{padding:"1rem",overflowY:"auto"}}>

{shoedata.length!==0?
shoedata.map((ele,index)=>{


return  <Link key={index} to={`/details/${ele.gender}'s-${ele.shoename.replace(/ /g,"-")}/${ele.id}/${ele.colorindex}`} className="norbox norbox_fav"   data-key="0" >
    <div className="image">
  
    <IKImage 
      path={ele.shoeimages[ele.shoecolors[ele.colorindex]][0]}
      transformation={[{
         "height":"430",
         "width": "430"
       }]}
       loading="lazy" lqip={{ active: true }}
     />
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