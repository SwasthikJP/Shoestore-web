import Navbar from "./navbar";
import Footern from "./footer";
import air from "../images/jordan2.jpg";
import "../css files/orders.css";

export default function Orders (){
  
    return <div>
        <Navbar signactive={false} signIn />
        <div className="addcartcover">
        <div className="addcartlist">
            <h3 style={{fontWeight:"500",marginBottom:"1rem"}}>Orders</h3>
            <div className="ordercombo">
               <div className="orderinfo">
                   <div className="leftdetails">
                       <p>Ordered on: 22/02/2021</p>
                       <p>Delivered on: 30/02/2021</p>
                       <p>Total cost: 30,000</p>
                   </div>
                   <div className="rightdetails">
                       <p>Delivary address:</p>
                       <p>Sahyadri Campus, Mangalore, Karnataka 575007</p>
                       <p>Payment: Cash on Delivary</p>
                   </div>
               </div>
        <div className="addcartbox">
                <img className="addcartimg" src={air} alt="" />
                <div className="addcartinfo">
                    <p>Nike Run</p>
                    <p className="subdetails">Running shoe</p>
                    <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"0.85rem"}}>7</span>Quantity <span>2
                   </span></p>
                        {/* <button className="remove">Remove</button> */}
                </div>
                <p style={{margin:"0 0 0 auto"}}>₹14,000</p>
            </div>
            <div className="addcartbox">
                <img className="addcartimg" src={air} alt="" />
                <div className="addcartinfo">
                    <p>Nike Run</p>
                    <p className="subdetails">Running shoe</p>
                    <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"0.85rem"}}>7</span>Quantity <span>2
                   </span></p>
                        {/* <button className="remove">Remove</button> */}
                </div>
                <p style={{margin:"0 0 0 auto"}}>₹14,000</p>
            </div>
            </div>
        </div>
        </div>
        <Footern />
    </div>
} 