import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faShoppingBag, faFolderMinus, faChevronRight, faChevronLeft, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import {  useEffect, useRef, useState } from "react";
import "../css files/navbar.css";
import { Link, useRouteMatch,useParams ,Redirect} from "react-router-dom";
import classNames from "classnames";
import Sign from "./sign";
import { createClient } from "@supabase/supabase-js";
import { useGetcontext } from "../functions/getcontext";


export default function Navbar(props) {
console.log(props.signactive)
const [divnum,setdivnum]=useState(-1);
const selectionlist=useRef(["Men","Women","Nike","Puma","Skechers"]);
const lastbarparentstyleactive=useRef({pointerEvents:"auto",backdropFilter:"blur(3px)",transition:"backdrop-filter 500ms linear"});
const lastbarparentstyle=useRef({pointerEvents:"none",backdropFilter:"blur(0px)",transition:"none"});
const [col2num,setcol2num]=useState(-1);
const [curcol,setcurcol]=useState(-1);
const [signactive,setsignactive]=useState(props.signactive);
const [signIn,setsignIn]=useState(props.signIn);
const signUpbut=useRef(null);
const signInbut=useRef(null);
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
        ],

    ]
);

const useroptions=useRef( 
    {
        title:"User",
        listitem:["Orders","Favourites","Log out"],
        // id:["MnSk","WmnSk","UnSk"],
        pathname:["orders","favourites"]
    }
     );

const {uid,checkUser}=useGetcontext();
const [gotopage,setgotopage]=useState("");

   useEffect(()=>{
setsignactive(props.signactive);
   },[props]);

   useEffect(()=>{
       checkUser();
   })



const hidesidebar=(e)=>{
    e.stopPropagation();
    if(e.target==e.currentTarget){
        setcol2num(-1)
    }
}

const SignOut=async()=>{
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
  const supabaseapi=process.env.REACT_APP_SUPABASE_API;
  const supabase=createClient(superbaseURL,supabaseapi);
  try{
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  console.log("done")
localStorage.removeItem("supabase.auth.token")
checkUser();
setcol2num(-1);
console.log(supabase.auth.user())
  }
  catch(er){
      console.log(er)
  }
}

const getuserdetails=()=>{
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
    return supabase.auth.user()?.user_metadata.full_name;
}
  
const setActive=(val)=>{
   props.setsignactive?.(val);
  setsignactive(val);
}

const gotoPage=(path)=>{
    if(checkUser()){
        setgotopage(path);
    }else{
        setsignIn(true);
        setsignactive(true);
     
    }
    setcol2num(-1);
   
}


    if(gotopage.length!==0){
        return <Redirect push to={`/${gotopage}`}></Redirect>
    }

    return <div className="navbardiv">
       {signactive && <Sign setactive={setActive} signIn={signIn} setsignIn={setsignIn}/>}
        <div className="minbar">
           <button> Help</button>
          <div className="vl"></div>
     { uid &&  <div className="hoverthis">
           <p>{getuserdetails()}</p>
           <div className="usercardcover">
           <div className="usercard">
              
                   <div onClick={()=>setgotopage("orders")} className="usercardopt">Orders</div>
                   <div onClick={()=>setgotopage("favourites")} className="usercardopt">Favourites</div>
                   <div onClick={SignOut} className="usercardopt">Log Out</div>

                   </div>
                   </div>
           </div>}

       
       {!uid &&  <button onClick={()=>{setsignactive(true);setsignIn(false);}}>Signup</button>}
   {!uid && <div className="vl"></div>}
  { !uid &&     <button onClick={()=>{setsignactive(true);setsignIn(true);}}>Signin</button>
  }
        </div>
        <div className="mainbar">
            <div className="logo"><h1>Shoestore</h1></div>
            <div className="selections">
                {
                    selectionlist.current.map((br,index)=>{
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
            <div className="fav" onClick={()=>gotoPage("favourites")} > <FontAwesomeIcon icon={faHeart} size="lg" /></div>
            <div className="cart" onClick={()=>gotoPage("cart")}> <FontAwesomeIcon icon={faShoppingBag} size="lg" /></div>
            <div className="search" onClick={SignOut}> <FontAwesomeIcon icon={faSearch} size="lg" /></div>
            <div className="options"onClick={()=>{setcol2num(0)}}> <FontAwesomeIcon icon={faFolderMinus} size="lg" /></div>
            
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
            </div>
        </div>
        {console.log("inside navbar"+signactive)}
<div className="sidebarcover"  style={col2num!==-1?{pointerEvents:"auto",boxShadow:"inset 0 0px 0px 100vh rgba(14, 13, 13, 0.281)",backdropFilter:"blur(3px)"}:{pointerEvents:"none"}} onClick={(e)=>{hidesidebar(e)}}>
        <div className="sidebar" style={col2num!==-1?{transform:"translate(0,0)"}:{}}>
      
        <div className={col2num===0?"col2":"col2hide"}>

       { uid &&    <button style={{marginBottom:"1rem"}} onClick={()=>{setdivnum(5);setcol2num(1);}}><span><i style={{fontStyle:"normal",fontSize:"1.05rem"}}><FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faUser} size="sm" />{getuserdetails()}</i> <FontAwesomeIcon  icon={faChevronRight} size="sm" /> </span></button>}
        {
            selectionlist.current.map((title,index)=>{
                return   <button onClick={()=>{setcol2num(1);setdivnum(index)}}><span> {title} <FontAwesomeIcon  icon={faChevronRight} size="sm" /> </span></button>
            })
        }

            <div className="offerlink" onClick={()=>gotoPage("favourites")} style={{marginTop:"1rem"}}><span className="goback"><FontAwesomeIcon icon={faHeart} size="lg" /> favourite</span> </div>

         { !uid &&   <div className="signbuts">
                 <button  className="offerlink offlink2" onClick={()=>{setcol2num(-1);setsignactive(true);setsignIn(false);}}>Signup</button>
                 <button  className="offerlink offlink2" onClick={()=>{setcol2num(-1); setsignactive(true);setsignIn(true);}}>Signin</button>
             </div>
}
            </div>


            <div className={col2num===1?"col2":"col2hide"}>
            <button onClick={()=>{setcol2num(0)}}><span className="goback"><FontAwesomeIcon  icon={faChevronLeft} size="sm" /> All  </span></button>
              {
           divnum===5 ?
           useroptions.current.listitem.map((title,index)=>
           index===2?   <button onClick={SignOut}><span>{title} </span></button>
            :
           <button  onClick={()=>{setcol2num(-1); setgotopage(useroptions.current.pathname[index])}}><span>{title}</ span></button>
               
               )
              :  divnum!==-1 && navitemlist.current[divnum].map((col,index)=>
            <button onClick={()=>{setcol2num(2);setcurcol(index)}}><span>{col.title}<FontAwesomeIcon  icon={faChevronRight} size="sm" /> </span></button>
                
                )
       }
           
            </div>


            <div className={col2num===2?"col2":"col2hide"}>
            <button onClick={()=>{setcol2num(1)}}><span className="goback"><FontAwesomeIcon  icon={faChevronLeft} size="sm" /> Men </span></button>
          {
             curcol!==-1 && divnum!==-1 && <p> {navitemlist.current[divnum][curcol].title} </p>
          }
          {
              
              curcol!==-1 && divnum!==-1 && navitemlist.current[divnum][curcol].listitem.map((option,index)=>
            <Link className="link2" onClick={()=>setcol2num(-1)} to={`/list/${navitemlist.current[divnum][curcol].pathname[index]}/${navitemlist.current[divnum][curcol].id[index]}`}>{option}</Link>
              
              )
          }
           
           
            </div>
        </div>
       
        </div>
    </div>
}