import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShoppingBag, faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import {  useState } from "react";
import "../css files/navbar.css";
import { Link } from "react-router-dom";


export default function Navbar() {


const [divnum,setdivnum]=useState(-1);
const selectionlist=["Men","Women","Nike","Puma","Skechers"];

    return <div className="navbardiv">
        <div className="minbar">

           <a  href="">Help</a>
          <div className="vl"></div>
           <a href="">Signup</a>
         <div className="vl"></div>
           <a href="">Signin</a>
        
        </div>
        <div className="mainbar">
            <div className="logo"><h1>Shoestore</h1></div>
            <div className="selections">
                {
                    selectionlist.map((br,index)=>{
                     return  <div onMouseOver={()=>{setdivnum(index)}} onMouseOut={()=>{setdivnum(-1)}} style={{borderBottom:divnum===index? "2px solid black":"2px solid transparent"}}>
            <p href="">{br}</p>
                 </div>
                    })
                }
              

            </div>
            <div className="input">
                <FontAwesomeIcon icon={faSearch} size="lg" />
                <input type="text" placeholder="Search" />
            </div>
           <div className="iconlist">
            <div className="fav"> <FontAwesomeIcon icon={faHeart} size="lg" /></div>
            <div className="cart"> <FontAwesomeIcon icon={faShoppingBag} size="lg" /></div>
            <div className="search"> <FontAwesomeIcon icon={faSearch} size="lg" /></div>
            <div className="options"> <FontAwesomeIcon icon={faFolderMinus} size="lg" /></div>
            
</div>

        </div>
        <div className="lastbarparent" style={{pointerEvents:divnum!=-1?"auto":"none",backdropFilter:divnum!=-1?"blur(3px)":"blur(0px)",transition:divnum!=-1?"backdrop-filter 500ms linear":"none"}}>
        <div className={divnum!=-1?"lastbar lastbaranim":"lastbar"}>
            <div className={divnum===0?"listanim":""} onMouseOver={()=>{setdivnum(0)}} onMouseOut={()=>{setdivnum(-1)}}>
                <div className="col">
                    <a href="">Shoes</a>
                    {/* <Link to={{pathname:"/shoelistings/men",state:{hello:true}}}>Shoes</Link> */}
                    <div className="list">
                    <a href="">All Shoes</a>
                        <a href="">Running</a>
                        <a href="">Sneakers</a>
                        <a href="">Basketball</a>
                        
                    </div>
                </div>

                <div className="col">
                    <a href="">Brands</a>
                    <div className="list">
                        <a href="">Nike</a>
                        <a href="">Puma</a>
                        <a href="">Skechers</a>
                    </div>
                </div>

            </div>


            <div className={divnum===1?"listanim":""} onMouseOver={()=>{setdivnum(1)}} onMouseOut={()=>{setdivnum(-1)}}>
                <div className="col">
                    <a href="">Shoes</a>
                    <div className="list">
                    <a href="">All Shoes</a>
                        <a href="">Running</a>
                        <a href="">Sneakers</a>
                        <a href="">Basketball</a>
                        

                    </div>
                </div>

                <div className="col">
                    <a href="">Brands</a>
                    <div className="list">
                        <a href="">Nike</a>
                        <a href="">Puma</a>
                        <a href="">Skechers</a>
                      

                    </div>
                </div>

            </div>

            <div className={divnum===2?"listanim":""} onMouseOver={()=>{setdivnum(2)}} onMouseOut={()=>{setdivnum(-1)}}>

 
            <div className="col">
                    <a href="">Shop By</a>
                    <div className="list">
                        <a href="">Men</a>
                        <a href="">Women</a>
                        <a href="">Unisex</a>
                    </div>
                </div>


                <div className="col">
                    <a href="">Shoes</a>
                    <div className="list">
                    <a href="">All Shoes</a>
                        <a href="">Running shoes</a>
                        <a href="">Sneakers</a>
                        <a href="">Jordans</a>
                    </div>
                </div>

                <div className="col">
                    <a href="">Clothing</a>
                    <div className="list">
                        <a href="">All Clothing</a>
                        <a href="">Tops and T-Shirts</a>
                        <a href="">Jerserys</a>
                        <a href="">Tracksuits</a>
                    </div>
                </div>

            </div>

            <div className={divnum===3?"listanim":""} onMouseOver={()=>{setdivnum(3)}} onMouseOut={()=>{setdivnum(-1)}}>

            <div className="col">
                    <a href="">Shop By</a>
                    <div className="list">
                        <a href="">Men</a>
                        <a href="">Women</a>
                        <a href="">Unisex</a>
                    </div>
                </div>

                <div className="col">
                    <a href="">Shoes</a>
                    <div className="list">
                    <a href="">All Shoes</a>
                        <a href="">Running shoes</a>
                        <a href="">Sneakers</a>

                    </div>
                </div>

                <div className="col">
                    <a href="">Clothing</a>
                    <div className="list">
                        <a href="">All Clothing</a>
                        <a href="">Tops and T-Shirts</a>
                        <a href="">Jerserys</a>
                        <a href="">Tracksuits</a>
                    </div>
                </div>

            </div>

            <div className={divnum===4?"listanim":""} onMouseOver={()=>{setdivnum(4)}} onMouseOut={()=>{setdivnum(-1)}}>

            <div className="col">
                    <a href="">Shop By</a>
                    <div className="list">
                        <a href="">Men</a>
                        <a href="">Women</a>
                        <a href="">Unisex</a>
                    </div>
                </div>


                <div className="col">
                    <a href="">Shoes</a>
                    <div className="list">
                    <a href="">All Shoes</a>
                        <a href="">Running shoes</a>
                        <a href="">Sneakers</a>

                    </div>
                </div>


                <div className="col">
                    <a href="">Clothing</a>
                    <div className="list">
                        <a href="">All Clothing</a>
                        <a href="">Tops and T-Shirts</a>
                        <a href="">Jerserys</a>
                        <a href="">Tracksuits</a>
                    </div>
                </div>

            </div>

            </div>
        </div>

    </div>
}