import Navbar from "./navbar";
import Footern from "./footer";
import air from "../images/jordan2.jpg";
import "../css files/orders.css";
import { useEffect, useRef, useState } from "react";
import { useGetcontext } from "../functions/getcontext";
import { createClient } from "@supabase/supabase-js";
import date from "date-and-time";
import { Link } from "react-router-dom";

export default function Orders (){

    const [shoeorders,setshoeorders]=useState([]);
    const {uid,checkUser} =useGetcontext();
    const paymentType=useRef(["Cash on Delivary","Upi","Credit/Debit card"]);

    useEffect(async()=>{
    try{
        const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
        const supabaseapi=process.env.REACT_APP_SUPABASE_API;
        const supabase=createClient(superbaseURL,supabaseapi);
        
        const {data,error}=await supabase.from("Orders").select('*')
        .eq("uid",uid);
        if(error) throw error;
        console.log(data);
        setshoeorders(data);
    }catch (err){
        window.alert(err.message);
        console.log(err);
    }
    },[uid]);
  
    return <div>
        <Navbar signactive={false} signIn />
        <div className="addcartcover">
        <div className="addcartlist">
            <h3 style={{fontWeight:"500",marginBottom:"1rem"}}>Orders</h3>
           {shoeorders.length!==0?

           shoeorders.map((ele)=>{
          return  <div className="ordercombo">
               <div className="orderinfo">
                   <div className="leftdetails">
                       <p>Ordered on: {date.format(new Date(ele.created_at), 'ddd, MMM DD YYYY')}</p>
                       <p>Delivered on: {date.format(new Date(ele.delivered_at), 'ddd, MMM DD YYYY')}</p>
                       <p>Total cost: ₹{ele.totalcost.total.toLocaleString()}</p>
                   </div>
                   <div className="rightdetails">
                       <p>Delivary address:</p>
                       <p>{ele.address}</p>
                       <p>Payment: {paymentType.current[ele.payment]}</p>
                   </div>
               </div>

               {
                   ele.shoeDetails.map((ele2)=>
                   <div className="addcartbox">
                              <Link className="addcartimg"  to={`/details/${ele2.shoes.gender}'s-${ele2.shoes.shoename.replace(/ /g,"-")}/${ele2.shoes.id}/${ele2.colorindex}`}>
                   <img className="addcartimg" src={ele2.shoes.shoeimages[ele2.shoes.shoecolors[ele2.colorindex]][0]} alt="shoe image" />
                  </Link>
                   <div className="addcartinfo">
                   <Link to={`/details/${ele2.shoes.gender}'s-${ele2.shoes.shoename.replace(/ /g,"-")}/${ele2.shoes.id}/${ele2.colorindex}`}>   <p>{ele2.shoes.shoename}</p></Link>
                       <p className="subdetails" style={{textTransform:"capitalize"}}>{ele2.shoes.shoetype} shoe</p>
                       <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"1rem"}}>{ele2.shoesize}</span>Quantity <span>{ele2.quantity}
                      </span></p>
                   </div>
                   <p style={{margin:"0 0 0 auto"}}>₹{(ele2.shoes.shoecost*ele2.quantity).toLocaleString()}</p>
               </div>
               ) }
   
            </div>
            })   :<p>You don't have any orders yet.</p> }
        </div>
           
        </div>
        <Footern />
    </div>
} 