import Footern from "./footer";
import Navbar from "./navbar";
import "../css files/addcart.css";
import air from "../images/jordan2.jpg";
import { useEffect, useState } from "react/cjs/react.development";
import { useGetcontext } from "../functions/getcontext";
import { createClient } from "@supabase/supabase-js";
import { Link , Redirect} from "react-router-dom";
import getData from "../functions/getCartitems.js";

export default function Addcart(){
    
    const {uid}=useGetcontext();
    const [shoedata,setshoedata]=useState([]);
    const [quantity,setquantity]=useState({});
    const [totalcost,settotalcost]=useState({subtotal:0,del:0,total:0});
    const [gotopage,setgotopage]=useState(null);
    
  

    useEffect(async()=>{
      updateParams(await getData(uid));
    },[]);

    const removeshoe=async(ele)=>{
        const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
        const supabaseapi=process.env.REACT_APP_SUPABASE_API;
        const supabase=createClient(superbaseURL,supabaseapi);
        try{
            const {data,error}=await supabase.from("Cart").delete()
            .match({
                shoeid:ele.shoes.id,
                colorindex:ele.colorindex,
                shoesize:ele.shoesize,
                uid:uid
            });
            if(error) throw error;
            console.log(data);
           updateParams(await getData(uid));
              
        }catch(err){
            window.alert(err.message);
            console.log(err);
        }
    }

    const updateQuantity=async(e,ele,index)=>{
        const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
        const supabaseapi=process.env.REACT_APP_SUPABASE_API;
        const supabase=createClient(superbaseURL,supabaseapi);


        let q=e.target.value;
        try{
            const {error}=await supabase.from("Cart")
            .update({
                quantity:q
            },{returning:"minimal"}).match({
              shoeid:ele.shoes.id,
              colorindex:ele.colorindex,
              shoesize:ele.shoesize,
              uid:uid
            });
            if(error) throw error;
           updateParams(await getData(uid));
        }catch(err){
            window.alert(err);
            console.log(err);
        }

    }

    const updateParams=(data)=>{
        let total={
            subtotal:0,
            del:0,
            total:0
        };
        let q={};
        if(data.length!==0){
            
          total.subtotal=data.reduce((prev,cur,index)=>{
            q[index]=cur.quantity;  
           return prev+cur.shoes.shoecost*cur.quantity},0);
          total.del=total.subtotal>10000? 0:1000;
          total.total=total.del+total.subtotal;
        }
        setshoedata(data);
        setquantity(q);
       settotalcost(total);
       console.log(total)
    }


      
   

    if(gotopage){
        return <Redirect push to={gotopage}></Redirect>
    }

    return <div>
        <Navbar></Navbar>
        <div className="addcartcover">
            <div className="addcartlist">
            <h3>Bag</h3>
  
          {shoedata.length!==0?
             shoedata.map((ele,index)=>{
                  return  <div className="addcartbox">
                              <Link className="addcartimg"  to={`/details/${ele.shoes.gender}'s-${ele.shoes.shoename.replace(/ /g,"-")}/${ele.shoes.id}/${ele.colorindex}`}>
                  <img className="addcartimg" src={ele.shoes.shoeimages[ele.shoes.shoecolors[ele.colorindex]]} alt="shoe image" />
            </Link>
                  <div className="addcartinfo">
                    <Link to={`/details/${ele.shoes.gender}'s-${ele.shoes.shoename.replace(/ /g,"-")}/${ele.shoes.id}/${ele.colorindex}`}>  <p>{ele.shoes.shoename}</p></Link>
                      <p className="subdetails">{ele.shoes.shoetype}</p>
                      <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"0.85rem"}}>{ele.shoesize}</span>Quantity <span><select value={quantity[index]} onChange={(e)=>{updateQuantity(e,ele,index)}} defaultValue={ele.quantity} name="quantity" id="quantity">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
  
                          </select></span></p>
                          <button className="remove" onClick={()=>removeshoe(ele)}>Remove</button>
                  </div>
                  <p style={{margin:"0 0 0 auto"}}>₹{(ele.shoes.shoecost*(quantity[index]?? ele.quantity)).toLocaleString()}</p>
              </div>
             
              }) : <p style={{marginTop:"1rem"}}>There are no items in your bag. </p>
          }
{console.log(quantity)}
           

            </div>
          {console.log("(((((9 add cart")}
            <div className="summary">
                <h3>Summary</h3>
                
                
               <div style={{padding:"0"}}> <span>Subtotal </span><span>₹{totalcost.subtotal.toLocaleString()}.00</span></div>
               <div> <span>Estimated Delivery & Handling </span><span>₹{totalcost.del.toLocaleString()}.00</span></div>
               <div ><span> Total </span><span>₹{totalcost.total.toLocaleString()}.00</span></div>
               <button className="favbut" onClick={()=>shoedata.length!==0? setgotopage( "/checkout"):null}>Checkout</button>
             
            </div>
            
        </div>
        <Footern />
    </div>
}