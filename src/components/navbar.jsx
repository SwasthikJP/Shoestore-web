import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShoppingBag, faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import {  useRef, useState } from "react";
import "../css files/navbar.css";
import { Link, useRouteMatch } from "react-router-dom";


export default function Navbar() {

const [divnum,setdivnum]=useState(-1);
const selectionlist=["Men","Women","Nike","Puma","Skechers"];
const lastbarparentstyleactive=useRef({pointerEvents:"auto",backdropFilter:"blur(3px)",transition:"backdrop-filter 500ms linear"});
const lastbarparentstyle=useRef({pointerEvents:"none",backdropFilter:"blur(0px)",transition:"none"});
const navitemlist=useRef(
    [
       [ 
        {
            title:"Shoes",
           listitem:["All Shoes","Running","Sneakers","Basketball"],
           id:["MnAs","MntseRn","MntseSk","MntseBll"],
           pathname:["mens-allshoes","mens-runningshoes","mens-sneakershoes","mens-jordanshoes"]
        },
        {
            title:"Brands",
            listitem:["Nike","Puma","Skechers"],
            id:["MnNk","MnPm","MnSk"],
            pathname:["mens-nikeshoes","mens-pumashoes","mens-skechershoes"]
        }
        ],
        [
            
                {
                    title:"Shoes",
                   listitem:["All Shoes","Running","Sneakers","Basketball"],
                 id:["WmnAs","WmntseRn","WmntseSk","WmntseBll"],
           pathname:["womens-allshoes","womens-runningshoes","womens-sneakershoes","womens-jordanshoes"]

                },
                {
                    title:"Brands",
                    listitem:["Nike","Puma","Skechers"],
                    id:["WmnNk","WmnPm","WmnSk"],
            pathname:["womens-nikeshoes","womens-pumashoes","womens-skechershoes"]
                }
                
        ],
        [
            {
               title:"Shop By",
               listitem:["Men","Women","Unisex"],
               id:["MnNk","WmnNk","UnNk"],
               pathname:["mens-nikeshoes","womens-nikeshoes","unisex-nikeshoes"]
            },
             {
                 title:"Shoes",
                 listitem:["All Shoes","Running","Sneakers","Jordans"],
                 id:["NkAs","NktseRn","NktseSk","NktseBll"],
                 pathname:["nike-allshoes","nike-runningshoes","nike-sneakershoes","nike-jordanshoes"]
             },
             {
                 title:"Clothing",
                 listitem:["All Clothing","Tops and T-Shirts","Jerseys","Tracksuits"],
                 id:["NkAc","NkTpTs","NkJr","NkTs"],
                 pathname:["nike-allclothing","nike-topsandtshirts","nike-jerseys","nike-tracksuits"]
             }
        ],
        [
            {
                title:"Shop By",
                listitem:["Men","Women","Unisex"],
                id:["MnPm","WmnPm","UnPm"],
                pathname:["mens-pumashoes","womens-pumashoes","unisex-pumashoes"]
             },
              {
                  title:"Shoes",
                  listitem:["All Shoes","Running","Sneakers"],
                  id:["PmAs","PmtseRn","PmtseSk"],
                  pathname:["puma-allshoes","puma-runningshoes","puma-sneakershoes"]
              },
              {
                  title:"Clothing",
                  listitem:["All Clothing","Tops and T-Shirts","Jerseys","Tracksuits"],
                  id:["PmAc","PmTpTs","PmJr","PmTs"],
                  pathname:["puma-allclothing","puma-topsandtshirts","puma-jerseys","puma-tracksuits"]
              }
        ],
        [
            {
                title:"Shop By",
                listitem:["Men","Women","Unisex"],
                id:["MnSk","WmnSk","UnSk"],
                pathname:["mens-skechersshoes","womens-skechersshoes","unisex-skechersshoes"]
             },
              {
                  title:"Shoes",
                  listitem:["All Shoes","Running","Sneakers"],
                  id:["SkAs","SktseRn","SktseSk"],
                  pathname:["skechers-allshoes","skechers-runningshoes","skechers-sneakershoes"]
              },
              {
                  title:"Clothing",
                  listitem:["All Clothing","Tops and T-Shirts","Jerseys","Tracksuits"],
                  id:["SkAc","SkTpTs","SkJr","SkTs"],
                  pathname:["skechers-allclothing","skechers-topsandtshirts","skechers-jerseys","skechers-tracksuits"]
              }
        ]

    ]
);

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
        <div className="lastbarparent" style={divnum!=-1?lastbarparentstyleactive.current:lastbarparentstyle.current}>
        <div className={divnum!=-1?"lastbar lastbaranim":"lastbar"}>
            {
                navitemlist.current.map((ele,index)=>{
                return <div key={index} className={divnum===index?"listanim":""} onMouseOver={()=>{setdivnum(index)}} onMouseOut={()=>{setdivnum(-1)}}>
               {
                   ele.map((ele2,index2)=>{
                  return  <div key={index+index2} className="col">
                  <a href="" key={index+index2}>{ele2.title}</a>
                  <div className="list" key={index+index2}>
                
                 {ele2.listitem.map((ele3,index3)=>{
                     return  <Link key={index+index2+index3} to={`/list/${ele2.pathname[index3]}/${ele2.id[index3]}`}>{ele3}</Link>
                 })}
                      
                  </div>
              </div>
                   })
               }
               

            </div>
                })
            }
            {/* <div className={divnum===0?"listanim":""} onMouseOver={()=>{setdivnum(0)}} onMouseOut={()=>{setdivnum(-1)}}>
                <div className="col">
                    <a href="">Shoes</a>
                   
                    <div className="list">
                    <Link to={`/list/men-allshoes/MnAs`}>All Shoes</Link>
                    <Link to={`/list/men-running/MntseRn`}>Running</Link>
                    <Link to={`/list/men-sneakers/MntseSk`}>Sneakers</Link>
                    <Link to={`/list/men-basketball/MntseBll`}>Basketball</Link>
                        
                    </div>
                </div>

                <div className="col">
                    <a href="">Brands</a>
                    <div className="list">
                        <Link to={"list/men-nike/MnNk"}>Nike</Link>
                        <Link to={"list/men-puma/MnPm"}>Puma</Link>
                        <Link to={"list/men-skechers/MnSk"}>Skechers</Link>
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

            </div> */}

            </div>
        </div>

    </div>
}