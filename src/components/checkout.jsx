import { useState } from "react/cjs/react.development";
import Footern from "./footer";
import Navbar from "./navbar";
import "../css files/checkout.css";


export default function Checkout(){

    const [paymentoption,setpaymentoption]=useState("");
    const [address,setaddress]=useState("");
 

    return <div>
        <Navbar></Navbar>
    <div>
        <form className="checkoutform" action="">
        <h3 style={{marginBottom:"0.3rem",fontWeight:"600"}}>Checkout</h3>
        <div className="addressbox">
            <h4>Address</h4>
            <textarea name="address" onChange={(e)=>setaddress(e.target.value)} id="address_textarea" cols="30" rows="10"></textarea>
        </div>
        <div className="paymentbox">
            <h4>Payment</h4>
            <label htmlFor="cod">
                 <input type="radio" id="cod" name="payment" checked={paymentoption==="cod"} onChange={(e)=>setpaymentoption(e.target.id)} />
            Cash on delivary</label>
            <label htmlFor="upi">
                 <input type="radio" id="upi" name="payment" checked={paymentoption==="upi"} onChange={(e)=>setpaymentoption(e.target.id)} />
            Upi</label>
            <label htmlFor="card">
                 <input type="radio" id="card" name="payment" checked={paymentoption==="card"}  onChange={(e)=>setpaymentoption(e.target.id)} />
            Credit/Debit card</label>
        </div>
        <button className="favbut">Complete order</button>
        </form>
    </div>
        <Footern />
    </div>
} 