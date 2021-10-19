import { useState } from "react";
import Footern from "../components/footer";
import Navbar from "../components/navbar";
import "../css files/checkout.css";
import { useGetcontext } from "../custom_hooks/getcontext";
import { Redirect } from "react-router";
import getData from "../functions/getCartitems";
import date from "date-and-time";
import  {supabase} from '../functions/supabaseClient';


export default function Checkout(){

    const [paymentoption,setpaymentoption]=useState("");
    const [address,setaddress]=useState("");
    const [errpay,seterrpay]=useState(false);
    const [erradd,seterradd]=useState(false);
    const {uid}=useGetcontext();
    const [gotopage,setgotopage]=useState(null);
    const [btntext,setbtntext]=useState("Complete order");

 


    const comOrder=async(e)=>{
        e.preventDefault();
        if(paymentoption.length!==0){
       if(address.length!==0){
      seterradd(false);
      const cartItems=await getData(uid);
      if(cartItems.length!==0){
         try{

        if(true)    {

                let total={};
    total["subtotal"]=cartItems.reduce((prev,cur)=>{
        return prev+cur.shoes.shoecost*cur.quantity},0);
        total.del=total.subtotal>10000? 0:1000;
        total.total=total.del+total.subtotal;
            const {error}=await supabase.from("Orders").insert({
             address,
             payment:paymentoption,
            delivered_at:date.addDays(new Date(),7),
            uid,
            totalcost:total,
            shoeDetails:cartItems
            });
            if(error) throw error;
          
            }
            const {error}=await supabase.from("Cart").delete({returning:"minimal"})
            .eq("uid",uid);
            if(error) throw error;
            setbtntext("Order completed!")
            setTimeout(() => {
                setgotopage("/");
            }, 200);
           
  
   }catch(err){
       window.alert(err.message);
       console.log(err.message);
   }
   }else{
       setgotopage("/");
   }

       }else{
           seterradd(true);
       }
        }else{
            seterrpay(true);
        }
    }

    if(gotopage){
        return <Redirect push to={gotopage}></Redirect>
    }

    return <div>
        <Navbar signactive={false} signIn></Navbar>
    <div>
        <form className="checkoutform" onSubmit={(e)=>comOrder(e)}>
        <h3 style={{marginBottom:"0.3rem",fontWeight:"600"}}>Checkout</h3>
        <div className="addressbox">
            <h4>Address</h4>
            <textarea name="address" onChange={(e)=>{setaddress(e.target.value);}} id="address_textarea" cols="30" rows="10"></textarea>
            {erradd &&   <p style={{marginLeft:"0.7rem",color:"red"}}>Please add the delivary address.</p>}
        </div>
        <div className="paymentbox">
            <h4>Payment</h4>
            <label htmlFor="cod">
                 <input type="radio" id="0" name="payment" checked={paymentoption==="0"} onChange={(e)=>{setpaymentoption(e.target.id);seterrpay(false);}} />
            Cash on delivary</label>
            <label htmlFor="upi">
                 <input type="radio" id="1" name="payment" checked={paymentoption==="1"} onChange={(e)=>{setpaymentoption(e.target.id);seterrpay(false);}} />
            Upi</label>
            <label htmlFor="card">
                 <input type="radio" id="2" name="payment" checked={paymentoption==="2"}  onChange={(e)=>{setpaymentoption(e.target.id);seterrpay(false);}} />
            Credit/Debit card</label>
          {errpay &&  <p style={{marginLeft:"0.7rem",color:"red"}}>Please select the payment option.</p>}
       
        </div>
        <button type="submit" className="favbut">{btntext}</button>
        </form>
    </div>
        <Footern />
    </div>
} 