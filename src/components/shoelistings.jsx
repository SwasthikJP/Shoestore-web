import Navbar from "./navbar";
import Footern from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/jordan2.jpg";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import "../css files/shoelistings.css"


// export default withRouter( function Shoelistings(props) {
export default function Shoelistings(props) {

    const shoesizeslist = [5, 6, 7, 8, 9, 10, 11, 12];
    const shoecolorslist = ["Black", "White", "Blue", "Brown", "Gray", "Red", "Green"];
    const [dropdown_classname, setdropdown_classname] = useState({ classname: "dropdown", effecton: true });
    const [minimizeclassgender, setminimizeclassgender] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclasssize, setminimizeclasssize] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclasscolor, setminimizeclasscolor] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclassbrands, setminimizeclassbrands] = useState({ classNames: "longdiv", effecton: true });
    const propsdata = useRef({});
    const [maindivclass, setmaindivclass] = useState({ classNames: "mainbody", effecton: true })
const [listdata,setlistdata]=useState([]);
    const [selectedsizes, setselectedsizes] = useState([]);
    const [selectedcolors, setselectedcolors] = useState([]);
    console.log(propsdata.current)

    // const addquery2=(ref)=>{

    //     for(const key in propsdata) {
    //         ref=ref.where(key,"in",propsdata[key]);
    //     }

    //     return ref;
    // }
  

    const getshoeslist = (data) => {
        console.log(data)
        var db = firebase.firestore();
        var ref = db.collection("shoes");
        //   ref=addquery2(ref);
        console.log("hehe")
        for (const key in data) {
            if (data[key].length != 0) {
                if (key === "shoecolors" || key === "shoesizes") {
                    console.log(data[key])
                    ref = ref.where(key, "array-contains-any", data[key]);
                } else {
                    console.log(data[key])
                    ref = ref.where(key, "==", data[key])
                }
            }
        }
        ref.get().then((query) => {
            const a = [];
            console.log("jj")
            query.forEach((ele) => {
                a.push(ele.data())
             
                // console.log(ele.data().gender)
            });
            console.log(a.length)
            setlistdata(a)

        }).catch((e) => {
            console.log(e)
        })

    }

    const addquery = (ref) => {
        var ob = {};
        for (const key in props.location.state) {
            if (key != "shoesizes" && key != "shoecolors") {
                ob[key] = [props.prop[key]];
            } else { ob[key] = props.prop[key] }
            ref = ref.where(key, "==", props.prop[key]);
        }
        propsdata.current = ob;
        console.log(ob)
        return ref;
    }

    useEffect(() => {

        // var app = firebase.initializeApp({
        //     apiKey: "AIzaSyAykEHE4EwOe98VDhdyUc8kHX-IATvHn98",
        //     authDomain: "shoestore-890e7.firebaseapp.com",
        //     projectId: "shoestore-890e7",
        //     storageBucket: "shoestore-890e7.appspot.com",
        //     messagingSenderId: "432163263716",
        //     appId: "1:432163263716:web:cc911376956aa8d50648f1",
        //     measurementId: "G-0X43EGYRB2"
        // });
        // console.log(props.location)
        // propsdata.current=props.location.state;
        // getshoeslist(propsdata.current)
    //     var db = firebase.firestore();
    //     var ref= db.collection("shoes");
    //   ref=addquery(ref);
    //  console.log("hehe")

    //           ref.get().then((query) => {
    //               const a=[];
    //               console.log("jj")
    //               query.forEach((ele) => {
    //                   a.push(ele.data())
    //                   console.log(ele.data())
    //               });
    //               console.log(a.length)
    //               // setlistdata(a)

    //           }).catch((e) => {
    //               console.log(e)
    //           })
    console.log(props.location)
    }, []);

    const dropdown_fun = () => {
        setdropdown_classname((prev) => {
            return { classname: classNames("dropdown", { dropdown_effect: prev.effecton }), effecton: !prev.effecton };
        }
        );
    }

    const addseconddetails = (e) => {
        e.target.closest(".norbox").childNodes[0].firstChild.src = e.target.src;
    }

    const addclassfun = () => {
        setmaindivclass((prev) => {
            return { classNames: classNames("mainbody", { dt: prev.effecton }), effecton: !prev.effecton }
        })
    }

    const genderfun = (e) => {
        var key = e.target.closest(".bottompadding").dataset.key;

        console.log(e.target.checked)

        var prev = propsdata.current;
        if (!Object.keys(prev).includes(key)) {
            prev[key] = [];
        }
        if (e.target.checked) {

            prev[key].push(e.target.id);
            console.log(prev[key])
        } else {

            prev[key] = prev[key].filter(ele => ele != e.target.id);
        }
        console.log(prev)
        getshoeslist(prev);

        propsdata.current = prev;
    }



    const sizeclick = (e, ind) => {

        setselectedsizes((res) => {
            console.log(res)

            if (res.includes(ind)) {
                console.log("sfasf" + ind)
                res = res.filter((n) => n != ind);
            } else {
                res = [...res, ind]
            }
            var prev = propsdata.current;
            prev["shoesizes"] = [...res];
            console.log(prev)
            console.log(res)
            // getshoeslist(prev);
            propsdata.current = prev;
            return res;
        })



        console.log(e.target)
    }


    const colorclick = (e, color) => {

        setselectedcolors((res) => {

            if (res.includes(color)) {
                console.log("sfasf" + color)
                res = res.filter((n) => n != color);
            } else {
                res = [...res, color]
            }

            var prev = propsdata.current;
            prev["shoecolors"] = [...res];
            console.log(prev)
            console.log(res)
            // getshoeslist(prev);
            propsdata.current = prev;

            return res;
        })





        console.log(e.target)
    }


    return <div>
        <Navbar />
        <div className="infotab">
            <div>
                <p className="roots">Running/ Shoes</p>
                <h3>Men's Running Shoes</h3>
            </div>
            <div className="cornerbut">
                <div className="hidefilter" onClick={() => { addclassfun() }}>Hide Filters <FontAwesomeIcon icon={faServer} /></div>
                <div className="select"  >

                    <p onClick={() => { dropdown_fun() }} >Sort By<span>:hello</span> <FontAwesomeIcon icon={faArrowDown} /></p>
                    <div className="dropdown_wrapper" style={{pointerEvents:dropdown_classname.effecton?"none":"auto"}}>
                        <div className={dropdown_classname.classname}>
                            <div> Featured</div>
                            <div>Newest</div>
                            <div>Price: High-Low</div>
                            <div>Price: Low-High</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={maindivclass.classNames}>
            {/* <button className="dt"></button> */}
            
            <span className="filterbody">
                {
                    Boolean(props.prop.shoetype) ||
                    <div className="typesofshoe">
                        <div>Running</div>
                        <div>Basketball</div>
                        <div>Sneakers</div>

                    </div>
                }

                <div className="genderlist">
                    <div className={minimizeclassgender.classNames} onClick={() => { setminimizeclassgender((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}>  <h5>Gender(1)</h5>   <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>
                    <div className="bottompadding" id="gender" data-key="gender">
                        <div className="boxdiv"><label htmlFor="men"><span>Men</span><input type="checkbox" name="men" id="men" data-key="men" defaultChecked={props.prop.gender === "men"} onClick={(e) => { genderfun(e) }} /><span className="box" ></span></label> </div>
                        <div className="boxdiv"><label htmlFor="women"><span>Women</span><input type="checkbox" name="women" id="women" data-key="women" defaultChecked={props.prop.gender === "women"} onClick={(e) => { genderfun(e) }} /><span className="box" ></span></label> </div>
                        <div className="boxdiv"><label htmlFor="unisex"><span>Unisex</span><input type="checkbox" name="unisex" id="unisex" data-key="unisex" defaultChecked={props.prop.gender === "unisex"} onClick={(e) => { genderfun(e) }} /><span className="box"></span></label> </div>
                    </div>
                </div>

                <div className="sizelist">
                    <div className={minimizeclasssize.classNames} onClick={() => { setminimizeclasssize((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Size</h5>
                        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>

                    <div className="allsizes bottompadding" data-key="shoesizes">
                        {

                            shoesizeslist.map((ele) => {
                                console.log(ele)
                                return <div className={selectedsizes.includes(ele) ? "size sizeactive" : "size"} id={ele} onClick={(e) => { sizeclick(e, ele) }}>{ele}</div>
                            })
                        }

                    </div>

                </div>

                <div className="colorlist">
                    <div className={minimizeclasscolor.classNames} onClick={() => { setminimizeclasscolor((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Color</h5>
                        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>
                    <div className="allcolors bottompadding">


                        {shoecolorslist.map((ele) => {
                            return <div className="colorb" onClick={(e) => colorclick(e, ele)}><div className="circle" style={{ backgroundColor: ele, opacity: 0.85 }}> <div className={selectedcolors.includes(ele) ? "tick tickactive" : "tick"} style={{ borderColor: ele === "White" ? "black" : "white" }}></div> </div>
                                <div className={selectedcolors.includes(ele) ?"cnameactive":""} >{ele}</div></div>
                        })}


                    </div>
                </div>



                <div className="brandlist">
                    <div className={minimizeclassbrands.classNames} onClick={() => { setminimizeclassbrands((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}>    <h5>Brands</h5>  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>
                    <div className="bottompadding" data-key="brand">
                        <div className="boxdiv"><label htmlFor="nike"><span>Nike</span><input type="checkbox" name="nike" id="nike" defaultChecked={props.prop.brand === "nike"} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                        <div className="boxdiv"><label htmlFor="puma"><span>Puma</span><input type="checkbox" name="puma" id="puma" defaultChecked={props.prop.brand === "puma"} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                        <div className="boxdiv"><label htmlFor="skechers"><span>Skechers</span><input type="checkbox" name="skechers" id="skechers" defaultChecked={props.prop.brand === "skechers"} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                    </div>
                </div>

            </span>
            <span className="shoelistbody">
                <div className="norbox" >
                    <div className="image">
                    <img src={air} alt="" />
                    </div>
                    <div className="details">
                        <p>Jordan</p>
                        <p className="subdetail">Basketball shoe</p>
                        <p className="subdetail">4 Colors</p>
                        {/* <p>₹20,200</p> */}
                    </div>

                    <div className="seconddetails">
                        <div className="picturediv">
                            <img src={air2} onMouseOver={(e) => { addseconddetails(e) }} style={{ height: "40px", width: "40px" }} alt="" />
                            <img src={air} onMouseOver={(e) => { addseconddetails(e) }} style={{ height: "40px", width: "40px" }} alt="" />
                        </div>
                        {/* <p>₹20,200</p> */}
                    </div>
                    <p>₹20,200</p>
                </div>


                <div className="norbox">
                <div className="image">
                    <img src={air} alt="" />
                    </div>

                    <p>Jordan</p>
                    <p className="subdetail">Basketball shoe</p>
                    <p className="subdetail">4 Colors</p>
                    <p>₹20,200</p>
                </div>


                <div className="norbox">
                <div className="image">
                    <img src={air} alt="" />
                    </div>

                    <p>Jordan</p>
                    <p className="subdetail">Basketball shoe</p>
                    <p className="subdetail">4 Colors</p>
                    <p>₹20,200</p>
                </div>



                <div className="norbox">
                <div className="image">
                    <img src={air} alt="" />
                    </div>

                    <p>Jordan</p>
                    <p className="subdetail">Basketball shoe</p>
                    <p className="subdetail">4 Colors</p>
                    <p>₹20,200</p>
                </div>


            </span>
        </div>


        <Footern />
    </div>
}
// )