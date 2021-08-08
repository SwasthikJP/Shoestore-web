import Navbar from "./navbar"
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/jordan2.jpg";
import '../productdetail.css'
import Footern from "./footer";
import firebase from "firebase";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Random from "random-number-arrays"


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

    useEffect(()=>{
        setcurrentcolor(props.prop.shoecolor)
        var app = firebase.initializeApp({
            apiKey: "AIzaSyAykEHE4EwOe98VDhdyUc8kHX-IATvHn98",
            authDomain: "shoestore-890e7.firebaseapp.com",
            projectId: "shoestore-890e7",
            storageBucket: "shoestore-890e7.appspot.com",
            messagingSenderId: "432163263716",
            appId: "1:432163263716:web:cc911376956aa8d50648f1",
            measurementId: "G-0X43EGYRB2"
        });
        var db = firebase.firestore();
        db.collection("shoes")
            .get().then((query) => {
                const a=[];
                query.forEach((ele) => {
                   var obj=ele.data();
                   obj["shoesizes"]=Random({ type:  'array', arraySize: 7,unique:true,data:shoesizes })
                    a.push(obj)
                });
                alldata.current=[...a];
                console.log(alldata.current)
            }).catch((e) => {
                console.log(e)

            })
    },[]);

    const fun2= async()=>{
const superbaseURL=process.env.REACT_APP_SUPABASE_URL;

const supabaseapi=process.env.REACT_APP_SUPABASE_API;
const supabase=createClient(superbaseURL,supabaseapi);

try{
  const {data,error} = await supabase.from("shoes").insert(alldata.current);
  if(error) throw error;
  console.log(data)

}catch (err){
console.log(err.message)
}


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

    return <div>
        <Navbar />
        <div className="totaldiv">
            <div className="shoeimages">
                {
                    data.current.shoeimages[currentcolor || props.prop.shoecolor].map((image)=>{
                      return  <img src={image} alt="shoe image" />
                    })
                }

            </div>
            <div className="infodiv">
                <div className="shoetype">Mens shoe</div>
                <div className="shoename">Nike React Miler 2</div>
                <div className="shoecost">₹20,200</div>
                <div className="pricedetail">incl. of taxes and duties</div>
                <div className="shoepictures">
                    {
                        data.current.shoecolors.map((color)=>{
              
             return <img className={currentcolor===color? "shoepicimg":""} src={data.current.shoeimages[color][0]}   alt="shoe image"  onClick={()=>{setcurrentcolor(color)}}/>
               
                        })
                    }


                </div>
                <p>Select Size</p>
                <div className="shoesizediv">
                    {shoesizes.map((num)=>{
                        return <div className={currentsize===num? "shoesize shoesize_active":"shoesize"} onClick={()=>{setcurrentsize(num)}}>IND {num}</div>
                    })}
                 
  

                </div>
                <button className="addcartbut">Add to Bag</button>
                <button className="favbut" onClick={()=>{fun2()}}>Favourite</button>
                <div className="shoedetails">
                Your workhorse with wings returns.The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor.Breathable mesh in the upper combines the comfort and durability you want with a wider fit at the toes.
                </div>

            </div>
        </div>
        <Footern/>
    </div>
}