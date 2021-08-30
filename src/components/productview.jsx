import Navbar from "./navbar"
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/jordan2.jpg";
import '../productdetail.css'
import Footern from "./footer";
import firebase from "firebase";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Random from "random-number-arrays";
import { Link, Redirect, useParams } from "react-router-dom";


export default function Productview(props){

    const data=useRef({
        shoecolors:["red","white"],
        shoeimages:{
            red:[air],
            white:[air2]
        },
    });

const shoesizes=["4","5","6","7","8","9","10","11","12","13","14"];

    const [currentcolor,setcurrentcolor]=useState("");
    const [currentsize,setcurrentsize]=useState("7");
    const alldata=useRef([]);
    const {id,colorindex}=useParams();
    const [shoedata,setshoedata]=useState([]);
    const [nextcolor,setnextcolor]=useState(0);
    const [gotopage,setgotopage]=useState(false);

    useEffect(async()=>{
        const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
        console.log(process.env.REACT_APP_SUPABASE_URL)
        const supabaseapi=process.env.REACT_APP_SUPABASE_API;
       
        try{

        const supabase=createClient(superbaseURL,supabaseapi);
        var ref=supabase.from("shoes").select('*');
        
       
           ref.eq("id",id);
           const {data,error}=await ref;
           if(error) throw error;
           console.log(data)
           setshoedata(data);
           setgotopage(false)
        }
        catch (error){
             console.log(error);
        }

        setcurrentcolor(props.prop.shoecolor)
       
    },[id,colorindex]);

    const fun2= async()=>{
// const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
// const supabaseapi=process.env.REACT_APP_SUPABASE_API;
// const supabase=createClient(superbaseURL,supabaseapi);

// try{
//   const {data,error} = await supabase.from("shoes").insert(alldata.current);
//   if(error) throw error;
//   console.log(data)

// }catch (err){
// console.log(err.message)
// }


    }

      const fun=()=>{
          const db=firebase.firestore();
          db.collection("shoes").add({
              brand:"skechers",
              gender:"women",
              shoecolors:["black"],
              shoecost:4000,
              shoeimages:{
    black:[
      "https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o/skechers%2Fsneakers%2Fwomen%2F149414%2F149414_nvhp_d_1.jpg?alt=media&token=fa6f05da-24cc-433a-b2ab-0861d20c5793",
      "https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o/skechers%2Fsneakers%2Fwomen%2F149414%2F149414_nvhp_1.jpg?alt=media&token=63fb5ead-f6da-4ea2-abbb-f206bc80fddf",
      "https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o/skechers%2Fsneakers%2Fwomen%2F149414%2F149414_nvhp_c_1.jpg?alt=media&token=0a03bbc5-6cfd-4b1b-8282-7856587c020b",
      "https://firebasestorage.googleapis.com/v0/b/shoestore-890e7.appspot.com/o/skechers%2Fsneakers%2Fwomen%2F149414%2F149414_nvhp_b_1.jpg?alt=media&token=e6039965-f1d9-483d-8df1-1de8cdc58bd3"
    ]
            },
              shoename:"Skechers Archfit",
               shoetype:"sneakers"
          }).then((ef)=>{
              console.log("executed")
          }).catch( (e)=>{
console.log(e)
          })
      }


    const scrollfast=(e)=>{
        console.log(e.currentTarget.scrollLeft)
        // e.currentTarget.scrollBy({ left: e.currentTarget.width, behavior: "smooth" });
    }


      if(gotopage){
          return <Redirect  to={`/details/${shoedata[0].gender}'s-${shoedata[0].shoename.replace(/ /g,"-")}/${shoedata[0].id}/${nextcolor}`} />
      }

    return <div>
        <Navbar />
        {shoedata.map((ele)=>{
       
      return <div className="totaldiv">
            <div className="shoeimages">
                {
                    ele.shoeimages[ele.shoecolors[colorindex]].map((image)=>{
                      return   <div className="image2"> <img src={image} alt="shoe image" /> </div>
                    })
                }

            </div>
            <div className="infodiv">
                <div className="changedir">
                    <div className="tog">
                <div className="shoetype">{ele.gender}'s shoe</div>
              
               
                <div className="shoename">{ele.shoename}</div>
                </div>
                <div className="tog">
                <div className="shoecost">₹{ele.shoecost}</div>
                <div className="pricedetail">incl. of taxes and duties</div>
                </div>
                </div>

             <div className="shoeimages2cover" >
                <div className="shoeimages2">
                {
                    ele.shoeimages[ele.shoecolors[colorindex]].map((image)=>{
                      return   <span className="image2"> <img src={image} alt="shoe image" /> </span>
                    })
                }
             </div>
            </div>

                <div className="shoepictures">
                    {
                        ele.shoecolors.map((color,index)=>{
              
             return <Link replace to={`/details/${shoedata[0].gender}'s-${shoedata[0].shoename.replace(/ /g,"-")}/${shoedata[0].id}/${index}`}> <img className={colorindex===`${index}`? "shoepicimg":""} src={ele.shoeimages[color][0]}   alt="shoe image"  /> </Link>
               
                        })
                    }


                </div>
                <p>Select Size</p>
                <div className="shoesizediv">
                    {ele.shoesizes.sort((a,b)=>{
                        return a-b;
                    }).map((num)=>{
                        return <div className={currentsize===num? "shoesize shoesize_active":"shoesize"} onClick={()=>{setcurrentsize(num)}}>IND {num}</div>
                    })}
                 
  

                </div>
                <button className="addcartbut">Add to Bag</button>
                <button className="favbut" onClick={()=>{fun2()}}>Favourite</button>
                <div  className="shoedetails">
                Your workhorse with wings returns.The {ele.shoename} continues to put a spring in your step, using the same responsive foam as its predecessor.Breathable mesh in the upper combines the comfort and durability you want with a wider fit at the toes.
                </div>

            </div>
        </div>
             
            })}
        <Footern/>
    </div>
         

}