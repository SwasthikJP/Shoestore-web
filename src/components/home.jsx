import Navbar from "./navbar";
import blurry_gradient from "../images/blurry_gradient.svg";
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/leb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Footern from "./footer";
import "../css files/home.css";
import { Link } from "react-router-dom";
import nike from "../images/nike.gif";
import nike2 from "../images/nike2.gif";
import puma2 from "../images/puma2.gif";
import  {supabase} from '../functions/supabaseClient';
import skechers from "../images/skechers.gif";
 

export default function Home() {


    const lists1 = useRef(null);
    const lists2 = useRef(null);
    const lists3 = useRef(null);
    const [leftcl1, setleftcl1] = useState("leftar");
    const [rightcl1, setrightcl1] = useState("rightar whitebac");
    const [leftcl2, setleftcl2] = useState("leftar");
    const [rightcl2, setrightcl2] = useState("rightar whitebac");
    const [leftcl3, setleftcl3] = useState("leftar");
    const [rightcl3, setrightcl3] = useState("rightar whitebac");
    const [listdata, setlistdata] = useState([]);
    const [nikeshoedata,setnikeshoedata]=useState([]);
    const [pumashoedata,setpumashoedata]=useState([]);
    const [skechersshoedata,setskechershoedata]=useState([]);


    const getshoelist=async(brand)=>{
                try{
                    var ref=supabase.from("shoes").select('*');
                    ref=ref.eq("brand",brand);
                    ref=ref.limit(8);
                    const {data,error}=await ref;
                    if(error) throw error;
                    console.log(data)
                  return data;

                }
                catch (error){
                    console.log(error);
                   return [];
                }
                
    }

  useEffect(async()=>{

  
    try{
  const nikedata=await getshoelist("nike");
  console.log("1")
  setnikeshoedata(nikedata);
  const pumadata=await getshoelist("puma");
  console.log("2")
  setpumashoedata(pumadata);
  const skecherdata=await getshoelist("skechers");
  console.log("3")
  setskechershoedata(skecherdata);
    }
    catch (err){
        console.log(err);
        setnikeshoedata([]);
        setpumashoedata([]);
        setskechershoedata([]);
    }

  console.log("executed")
  },[]);




    const scroll = (left,lists) => {
        lists.current.scrollBy({ left: left * -380, behavior: "smooth" });
    }


    const scrolldetect = (lists,setrightcl,setleftcl) => {

        if (lists.current.scrollLeft === 0) {
            setleftcl(classNames("leftar"));
            setrightcl(classNames("rightar", "whitebac"));
        } else if ((lists.current.scrollWidth-16) <= Math.round(lists.current.scrollLeft)+lists.current.offsetWidth) {
            setleftcl(classNames("leftar", "whitebac"));
            setrightcl(classNames("rightar"));
        } else {
            setleftcl(classNames("leftar", "whitebac"));
            setrightcl(classNames("rightar", "whitebac"));
        }
    }


    const norboxfun=(item,index)=>{
     return <Link to={`/details/${item.gender}'s-${item.shoename.replace(/ /g,"-")}/${item.id}/${0}`} className="norbox2" key={index}>
     <img src={item.shoeimages[item.shoecolors[0]][0]} alt={`${item.shoename} image`} />
     <div className="maindetail">
         <p>{item.shoename}</p>
         <p className="shoecost1">₹{item.shoecost}</p>
     </div>
     <p className="subdetail">{item.shoetype}</p>
     <p className="shoecost2">₹{item.shoecost}</p>
 </Link>;
    }




    return <div className="home" >
        <Navbar signactive={false} signIn={true}/>
        
        <div className="im" >
          <Link  className="Link" to="/list/nike-allshoes/NkAs">  <img  style={{ objectFit: "cover",width:"100%"}} src={nike} alt="nike shoe" /></Link>
            <span className="together">
               
            <Link to="/list/puma-allshoes/PmAs">  <img style={{display:"inline-block"}} src={puma2} alt="puma shoe" /></Link>
            <Link to="/list/skechers-allshoes/SkAs"> <img src={skechers} alt="skechers shoe" /></Link>
            </span>
           
        </div>

        <h2>Shop Now</h2>
        <div className="buttons">
           <Link to="/list/mens-allshoes/MnAs" className="offerlink" href="">Men</Link>
           <Link to="/list/womens-allshoes/WmnAs" className="offerlink" href="">Women</Link>
        </div>

        <div className="im2" >
            <img  src={nike2} alt="" />
            <Link to="/details/women's-Air-Run-2/3/0" className="hover offerlink" >Shop</Link>
        </div>

{console.log("rendered")}
        <h3 className="moreh3">More Nike</h3>

        <div className="outer">
            <button className={leftcl1} onClick={() => scroll(1,lists1)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
            <button className={rightcl1} onClick={() => scroll(-1,lists1)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
          <div className="scrollthis" ref={lists1} onScroll={() => scrolldetect(lists1,setrightcl1,setleftcl1)}>
            <div className="lists" >
       {
           nikeshoedata.map((item,index)=> norboxfun(item,index))
           
       }

       
      
               
               </div>
            </div>

        </div>

        <h3 className="moreh3">More Puma</h3>

<div className="outer">
    <button className={leftcl2} onClick={() => scroll(1,lists2)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
    <button className={rightcl2} onClick={() => scroll(-1,lists2)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
  <div className="scrollthis" ref={lists2} onScroll={() => scrolldetect(lists2,setrightcl2,setleftcl2)}>
    <div className="lists" >
{
   pumashoedata.map((item,index)=>norboxfun(item,index))
}

</div>
</div>
</div>

<h3 className="moreh3">More Skechers</h3>

<div className="outer">
    <button className={leftcl3} onClick={() => scroll(1,lists3)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
    <button className={rightcl3} onClick={() => scroll(-1,lists3)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
  <div className="scrollthis" ref={lists3} onScroll={() => scrolldetect(lists3,setrightcl3,setleftcl3)}>
    <div className="lists" >
{
  skechersshoedata.map((item,index)=>norboxfun(item,index))
}

</div>
</div>
</div>

        <Footern />
    </div>
}