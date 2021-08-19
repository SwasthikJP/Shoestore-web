import Navbar from "./navbar";
import blurry_gradient from "../images/blurry_gradient.svg";
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/leb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Footern from "./footer";
import firebase from "firebase";
import "../css files/home.css";
import { Link } from "react-router-dom";

export default function Home() {


    const lists = useRef(null);
    const [leftcl, setleftcl] = useState("leftar");
    const [rightcl, setrightcl] = useState("rightar whitebac");
    const [listdata, setlistdata] = useState([]);

    // useEffect(() => {
    //     var app = firebase.initializeApp({
    //         apiKey: "AIzaSyAykEHE4EwOe98VDhdyUc8kHX-IATvHn98",
    //         authDomain: "shoestore-890e7.firebaseapp.com",
    //         projectId: "shoestore-890e7",
    //         storageBucket: "shoestore-890e7.appspot.com",
    //         messagingSenderId: "432163263716",
    //         appId: "1:432163263716:web:cc911376956aa8d50648f1",
    //         measurementId: "G-0X43EGYRB2"
    //     });
    //     var db = firebase.firestore();
    //     db.collection("shoes").where("brand", "==", "nike").limit(6)
    //         .get().then((query) => {
    //             const a=[];
    //             query.forEach((ele) => {
    //                 a.push(ele.data())
    //             });
             
    //             setlistdata(a)
    //         }).catch((e) => {
    //             console.log(e)

    //         })
    // }, [])




    const scroll = (left) => {
        lists.current.scrollBy({ left: left * -380, behavior: "smooth" });
    }


    const scrolldetect = () => {

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




    return <div>
        <Navbar />
        <div className="cardanim">
<a href="">hello</a>
        </div>
        <div className="im" >
            <img style={{ objectFit: "fill", height: "80vh" }} src={blurry_gradient} alt="" />
        </div>

        <h2>Shop Now</h2>
        <div className="buttons">
           <a className="offerlink" href="">Men</a>
           <a className="offerlink" href="">Women</a>
        </div>

        <div className="im" >
            <img style={{ objectFit: "fill", height: "80vh" }} src={blurry_gradient} alt="" />
            <a className="hover offerlink" href="">Shop</a>
        </div>


        <h3>More Nike</h3>

        <div className="outer">
            <button className={leftcl} onClick={() => scroll(1)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
            <button className={rightcl} onClick={() => scroll(-1)}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
          <div className="scrollthis" ref={lists} onScroll={() => scrolldetect()}>
            <div className="lists" >

       <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>
          <div className="norbox2">
              <img src={air} alt="" />
              <div className="maindetail">
                  <p>NIke air</p>
                  <p>₹15000</p>
              </div>
              <p className="subdetail">Sneakers</p>
          </div>

       
    {/* {listdata.map((ele)=>{
            
              return  <div className="norbox2">
              <img src={ele.shoeimages[ele.shoecolors[0]][0]} alt="" />
              <div className="maindetail">
                  <p>{ele.shoename}</p>
                  <p>₹{ele.shoecost}</p>
              </div>
              <p className="subdetail">{ele.shoetype}</p>
          </div>
          })} */}
               
               </div>
            </div>

        </div>
        <Footern />
    </div>
}