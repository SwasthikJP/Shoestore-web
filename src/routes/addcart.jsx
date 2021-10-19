import Footern from "../components/footer";
import Navbar from "../components/navbar";
import "../css files/addcart.css";
import { useEffect, useState } from "react";
import { useGetcontext } from "../custom_hooks/getcontext";
import { Link , Redirect} from "react-router-dom";
import getData from "../functions/getCartitems";
import {supabase} from '../functions/supabaseClient';
import { IKImage } from "imagekitio-react";

export default function Addcart(){
    
    const {uid}=useGetcontext();
    const [shoedata,setshoedata]=useState([]);
    const [quantity,setquantity]=useState({});
    const [totalcost,settotalcost]=useState({subtotal:0,del:0,total:0});
    const [gotopage,setgotopage]=useState(null);


    
  

    useEffect(()=>{
        async function fetchData(){
      updateParams(await getData(uid));
        }
        fetchData();
    },[uid]);

    const removeshoe=async(ele)=>{
        try{
            const {error}=await supabase.from("Cart").delete()
            .match({
                shoeid:ele.shoes.id,
                colorindex:ele.colorindex,
                shoesize:ele.shoesize,
                uid:uid
            });
            if(error) throw error;
           updateParams(await getData(uid));
              
        }catch(err){
            window.alert(err.message);
            console.log(err.message);
        }
    }

    const updateQuantity=async(e,ele)=>{


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
            console.log(err.message);
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
    }


      
   

    if(gotopage){
        return <Redirect push to={gotopage}></Redirect>
    }

    return <div>
        <Navbar signactive={false} signIn></Navbar>
        <div className="addcartcover">
            <div className="addcartlist">
            <h3>Bag</h3>
  
          {shoedata.length!==0?
             shoedata.map((ele,index)=>{
                  return  <div key={index} className="addcartbox">
                              <Link aria-label={ele.shoes.shoename} className="addcartimg"  to={`/details/${ele.shoes.gender}'s-${ele.shoes.shoename.replace(/ /g,"-")}/${ele.shoes.id}/${ele.colorindex}`}>
                  <IKImage  className="addcartimg"
      path={ele.shoes.shoeimages[ele.shoes.shoecolors[ele.colorindex]][0]}
      transformation={[{
         "height":"151",
         "width": "151"
       }]}
       loading="lazy" lqip={{ active: true }}
     />
            </Link>
                  <div className="addcartinfo">
                    <Link aria-label={ele.shoes.shoename} to={`/details/${ele.shoes.gender}'s-${ele.shoes.shoename.replace(/ /g,"-")}/${ele.shoes.id}/${ele.colorindex}`}>  <p>{ele.shoes.shoename}</p></Link>
                      <p className="subdetails" style={{textTransform:"capitalize"}}>{ele.shoes.shoetype} shoe</p>
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

           

            </div>
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