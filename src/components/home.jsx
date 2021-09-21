import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Footern from "./footer";
import "../css files/home.css";
import { Link } from "react-router-dom";
import nikewebm from "../images/nike.webm";
import nikemp4 from "../images/nike.mp4";
import nike2webm from "../images/nike2.webm";
import nike2mp4 from "../images/nike2.mp4";
import puma2webm from "../images/puma2.webm";
import puma2mp4 from "../images/puma2.mp4";
import  {supabase} from '../functions/supabaseClient';
import skecherswebm from "../images/skechers.webm";
import skechersmp4 from "../images/skechers.mp4";
import { IKImage } from "imagekitio-react";
 

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
    const [nikeshoedata,setnikeshoedata]=useState([]);
    const [pumashoedata,setpumashoedata]=useState([]);
    const [skechersshoedata,setskechershoedata]=useState([]);




  useEffect(()=>{
    
    async function fetchData(){

    try{
 const {data,error} =await supabase.from("Home").select("*");
 if(error) throw error;
 setnikeshoedata(data[0].nike);
 setpumashoedata(data[0].puma);
 setskechershoedata(data[0].skechers);
    }
    catch (err){
        console.log(err.message);
        setnikeshoedata([]);
        setpumashoedata([]);
        setskechershoedata([]);
    }

    }
    fetchData();
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
     <IKImage  
      path={item.shoeimages[item.shoecolors[0]][0]}
      transformation={[{
         "height":"415",
         "width": "415"
       }]}
       loading="lazy" lqip={{ active: true }}
     />
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
          <Link  className="Link" to="/list/nike-allshoes/NkAs">  <video autoPlay loop muted playsInline style={{ objectFit: "cover",width:"100%"}}  >
            <source src={nikewebm} type="video/webm"/>
            <source src={nikemp4} type="video/mp4" />
            </ video></Link>
            <span className="together">
               
            <Link to="/list/puma-allshoes/PmAs">  <video autoPlay loop muted playsInline style={{display:"inline-block"}} >
              <source src={puma2webm} type="video/webm"/>
              <source src={puma2mp4} type="video/mp4"/>
              </video></Link>
            <Link to="/list/skechers-allshoes/SkAs"> <video autoPlay loop muted playsInline>
              <source src={skecherswebm} type="video/webm" />
              <source src={skechersmp4} type="video/mp4"/>
              </video></Link>
            </span>
           
        </div>

        <h2>Shop Now</h2>
        <div className="buttons">
           <Link to="/list/mens-allshoes/MnAs" className="offerlink" href="">Men</Link>
           <Link to="/list/womens-allshoes/WmnAs" className="offerlink" href="">Women</Link>
        </div>

        <div className="im2" >
            <video autoPlay loop muted playsInline>
              <source src={nike2webm} type="video/webm"/>
              <source src={nike2mp4} type="video/mp4"/>
            </video>
            <Link to="/details/women's-Air-Run-2/3/0" className="hover offerlink" >Shop</Link>
        </div>

        <h3 className="moreh3">More Nike</h3>

        <div className="outer">
            <button aria-label="scroll left" className={leftcl1} onClick={() => scroll(1,lists1)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
            <button aria-label="scroll right" className={rightcl1} onClick={() => scroll(-1,lists1)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
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
    <button aria-label="scroll left" className={leftcl2} onClick={() => scroll(1,lists2)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
    <button aria-label="scroll right" className={rightcl2} onClick={() => scroll(-1,lists2)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
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
    <button aria-label="scroll left" className={leftcl3} onClick={() => scroll(1,lists3)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
    <button aria-label="scroll right"  className={rightcl3} onClick={() => scroll(-1,lists3)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
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