import Footern from "./footer";
import Navbar from "./navbar";
import "../css files/addcart.css";
import air from "../images/jordan2.jpg";

export default function Addcart(){

    return <div>
        <Navbar></Navbar>
        <div className="addcartcover">
            <div className="addcartlist">
            <h3>Bag</h3>
            <div className="addcartbox">
                <img className="addcartimg" src={air} alt="" />
                <div className="addcartinfo">
                    <p>Nike Run</p>
                    <p className="subdetails">Running shoe</p>
                    <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"0.85rem"}}>7</span>Quantity <span><select name="quantity" id="quantity">
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
                        <button className="remove">Remove</button>
                </div>
                <p style={{margin:"0 0 0 auto"}}>₹14,000</p>
            </div>

            <div className="addcartbox">
                <img className="addcartimg" src={air} alt="" />
                <div className="addcartinfo">
                    <p>Nike Run</p>
                    <p className="subdetails">Running shoe</p>
                    <p className="subdetails">Size <span style={{margin:"0 5px",fontSize:"0.85rem"}}>7</span>Quantity <span><select name="quantity" id="quantity">
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
                        <button className="remove">Remove</button>
                </div>
                <p style={{margin:"0 0 0 auto"}}>₹14,000</p>
            </div>

            </div>
            
            <div className="summary">
                <h3>Summary</h3>
               <div style={{padding:"0"}}> <span>Subtotal </span><span>₹14,000.00</span></div>
               <div> <span>Estimated Delivery & Handling </span><span>₹14,000.00</span></div>
               <div ><span> Total </span><span>₹14,000.00</span></div>
               <button className="favbut">Checkout</button>
            </div>
        </div>
        <Footern />
    </div>
}