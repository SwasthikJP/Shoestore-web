import Navbar from "./navbar"
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/jordan2.jpg";
import '../productdetail.css';
import '../css files/sign.css';
import Footern from "./footer";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Link, Redirect, useParams } from "react-router-dom";
import { useGetcontext } from "../custom_hooks/getcontext";
import  {supabase} from '../functions/supabaseClient';


export default function Productview(){


    const [currentsize,setcurrentsize]=useState("0");
    const [selectSize,setselectSize]=useState(false);
    const {id,colorindex}=useParams();
    const [shoedata,setshoedata]=useState([]);
    const [nextcolor,setnextcolor]=useState(0);
    const [gotopage,setgotopage]=useState(false);
    const infoDiv=useRef(null);
    const [addcartclass,setaddcartclass]=useState("addcartbut2");
    const addcartBut=useRef(null);
    const {uid,checkUser}=useGetcontext();
    const [favact,setfavact]=useState(false);
    const [signactive,setsignactive]=useState(false);
    const [updatecart,setupdatecart]=useState(false);


    useEffect(async()=>{

        try{

        var ref=supabase.from("shoes").select('*');
        
       
           ref.eq("id",id);
           const {data,error}=await ref;
           if(error) throw error;
           console.log(data)
           setshoedata(data);
           setgotopage(false);
           let observer=new IntersectionObserver((entries)=>{
               entries.forEach((entry,index)=>{
                   setaddcartclass(classNames("addcartbut2",{addcartbut_active:entry.intersectionRatio===0}));
                console.log("index"+index)
                   console.log(entry.target)
                    console.log(entry.intersectionRatio)
               
                 
               })
               
           },{root:null,rootMargin:"0px",threshold:[0,0.1]});
           console.log(addcartBut.current)
           observer.observe(addcartBut.current);
          
        }
        catch (error){
             console.log(error);
        }
        
       
    },[id,colorindex]);

    useEffect(async()=>{
        let Uid=checkUser();
        
        if(Uid){
            try{

            const {data,error}=await supabase.from("Favourites").select().match({
              uid:Uid,  shoeid:id,colorindex
            });
            if(error) throw error;
            setfavact(Array.isArray(data) && data.length)
            console.log(Uid)
        }catch(err){
            console.log(err)
        }
        }else{
            setfavact(false)
            console.log(Uid+"no user"+uid)
        }
    },[uid,id,colorindex]);





    const scrollfast=(e)=>{
        console.log(e.currentTarget.scrollLeft)
        // e.currentTarget.scrollBy({ left: e.currentTarget.width, behavior: "smooth" });
    }

    const addtoFav=async()=>{
        let Uid=checkUser();
        if(Uid){
            console.log("inside uid "+ favact);
            
           
            try{
                if(!favact){

  
                var {error}=await supabase.from("Favourites").upsert({
             uid:Uid,shoeid:id,colorindex,updated_at:new Date()
                },{returning:"minimal",ignoreDuplicates:false});
            }else{
                var {error}=await supabase.from("Favourites").delete({returning:"minimal"}).match({
                    uid:Uid,shoeid:id,colorindex
                });
           }
                if(error) throw error;

                setfavact((prev)=>!prev);

            }catch (err){
                window.alert(err);
                console.log(err);
            }

        }else{
            setsignactive(true);
        }
        
    }


    const addtocart=async()=>{
        const Uid=checkUser();
        const queryob={
            shoeid:id,
            uid:Uid,
            colorindex,
            shoesize:currentsize
        };
        if(Uid){
            if(currentsize!=="0"){
       try{
        const {data,error}=await supabase.from("Cart").select('quantity').match(
           queryob
        );
        if(error) throw error;
      
           {
        const {error}=await supabase.from("Cart").upsert({
           ...queryob,
           quantity:Array.isArray(data) && data.length!==0 ? data[0].quantity===10 ?10:data.pop().quantity + 1:1,
            updated_at:new Date()
        },{ignoreDuplicates:false});
        if(error) throw error;
        setupdatecart(true);
           }
       }catch(err){
           window.alert(err.message)
           console.log(err)
       }
    }else{
        setselectSize(true);
    }
    }else{
        setsignactive(true);
    }
    }


      if(gotopage){
          return <Redirect  to={`/details/${shoedata[0].gender}'s-${shoedata[0].shoename.replace(/ /g,"-")}/${shoedata[0].id}/${nextcolor}`} />
      }

    return <div>


        <Navbar signactive={signactive} signIn setsignactive={setsignactive}/>
        <div style={{minHeight:"80vh"}}>
        {shoedata.map((ele,index)=>{
       
      return <div key={index} className="totaldiv"  >
            <div className="shoeimages">
                {
                    ele.shoeimages[ele.shoecolors[colorindex]].map((image,index)=>{
                      return   <div key={index} className="image2"> <img src={image} alt="shoe image" /> </div>
                    })
                }

            </div>
            <div className="infodiv" ref={infoDiv}>
                <div className="changedir">
                    <div className="tog">
                <div className="shoetype">{ele.gender}'s shoe</div>
              
               
                <div className="shoename" style={{textTransform:"capitalize"}}>{ele.shoename}</div>
                </div>
                <div className="tog">
                <div className="shoecost">₹{ele.shoecost}</div>
                <div className="pricedetail">incl. of taxes and duties</div>
                </div>
                </div>

             <div className="shoeimages2cover" >
                <div className="shoeimages2">
                {
                    ele.shoeimages[ele.shoecolors[colorindex]].map((image,index)=>{
                      return   <span key={index} className="image2"> <img src={image} alt="shoe image" /> </span>
                    })
                }
             </div>
            </div>

                <div className="shoepictures">
                    {
                        ele.shoecolors.map((color,index)=>{
              
             return <Link key={index} replace to={`/details/${shoedata[0].gender}'s-${shoedata[0].shoename.replace(/ /g,"-")}/${shoedata[0].id}/${index}`}> <img className={colorindex===`${index}`? "shoepicimg":""} src={ele.shoeimages[color][0]}   alt="shoe image"  /> </Link>
               
                        })
                    }


                </div>
                <p style={{color:selectSize?"#d43f21":"black"}}>Select Size</p>
                <div className={selectSize?"shoesizediv shoesizediv_active":"shoesizediv"}>
                    {ele.shoesizes.sort((a,b)=>{
                        return a-b;
                    }).map((num,index)=>{
                        return <div key={index} className={currentsize===num? "shoesize shoesize_active":"shoesize"} onClick={()=>{setcurrentsize(num);setselectSize(false);}}>IND {num}</div>
                    })}
                 {console.log("+++ "+typeof(currentsize))}
  

                </div>
              { selectSize && <p style={{marginBottom:"1rem",color:"#d43f21"}}>Please select a size.</p>}
      {console.log("product view rendered==="+uid)}
                <button ref={addcartBut} className="addcartbut"  onClick={addtocart}>Add to Bag</button>
                <button  className={addcartclass} onClick={addtocart}>Add to Bag</button>
              { updatecart && <p style={{marginBottom:"1rem"}}>Added to cart.</p>}
               
                <button  className={favact?"favbut favbut_active":"favbut"} onClick={addtoFav}>Favourite</button>

                <div  className="shoedetails">
                Your workhorse with wings returns.The {ele.shoename} continues to put a spring in your step, using the same responsive foam as its predecessor.Breathable mesh in the upper combines the comfort and durability you want with a wider fit at the toes.
                </div>

            </div>
        </div>
        
             
            })}
            </div>
        <Footern/>
    </div>
         

}