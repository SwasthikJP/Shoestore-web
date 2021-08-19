import Navbar from "./navbar";
import Footern from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import air from "../images/air_jordan_4.jpg";
import air2 from "../images/jordan2.jpg";
import firebase from "firebase";
import { Redirect, useParams, withRouter } from "react-router-dom";
import "../css files/shoelistings.css"
import { createClient } from "@supabase/supabase-js";

export default withRouter( function Shoelistings(props) {
// export default function Shoelistings(props) {

    const shoesizeslist = [5, 6, 7, 8, 9, 10, 11, 12];
    const shoecolorslist = ["black", "white", "blue", "brown", "gray", "red", "green"];
    const [dropdown_classname, setdropdown_classname] = useState({ classname: "dropdown", effecton: true });
    const [minimizeclassgender, setminimizeclassgender] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclasssize, setminimizeclasssize] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclasscolor, setminimizeclasscolor] = useState({ classNames: "longdiv", effecton: true });
    const [minimizeclassbrands, setminimizeclassbrands] = useState({ classNames: "longdiv", effecton: true });
    const propsdata = useRef({
        brand:[],
        gender:[],
        shoecolors:[],
        shoesizes:[],
        shoetype:[]
    });
    const [maindivclass, setmaindivclass] = useState({ classNames: "mainbody", effecton: true })
const [listdata,setlistdata]=useState([]);
    const [selectedsizes, setselectedsizes] = useState([]);
    const [selectedcolors, setselectedcolors] = useState([]);
    console.log(propsdata.current)
    const {data,id}=useParams();
    const idlist=useRef({
        MnAs:{gender:"men"},
        MntseRn:{gender:"men",shoetype:"running"},
        MntseSk:{gender:"men",shoetype:"sneakers"},
        MntseBll:{gender:"men",shoetype:"jordan"},
        MnNk:{gender:"men",brand:"nike"},
        MnPm:{gender:"men",brand:"puma"},
        MnSk:{gender:"men",brand:"skechers"}
    });
    const [wrongid,setwrongid]=useState(false);
    const [transitionopacity,settransitionopacity]=useState(false);
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

    const addquery = async() => {
        const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
console.log(process.env.REACT_APP_SUPABASE_URL)
const supabaseapi=process.env.REACT_APP_SUPABASE_API;
const supabase=createClient(superbaseURL,supabaseapi);
        var ref=supabase.from("shoes").select('*');
        
              
        for (const key in propsdata.current) {
            console.log(propsdata.current[key])
            var ar=propsdata.current[key];
            if(Array.isArray(ar) &&  ar.length!=0){
            if (key != "shoesizes" && key != "shoecolors") {
                // ob[key] = [props.prop[key]];
                // ref=ref.eq(key,propsdata.current[key][0])
              ref=ref.in(key,ar);
            // } else { ob[key] = props.prop[key] }
            }
         else  {
            ref = ref.contains(key,ar);
            }
        }
        }
    
console.log(ref);

        try{
            // const {data,error} = await supabase.from("shoes").select();
        //    var ref=supabase.from("shoes").select();
        const {data,error}=await ref;
      
            console.log(data)
            setlistdata(data)
            if(error) throw error;

          
          }catch (err){
          console.log(err)
          }
          settransitionopacity(false);

        // var ob = {};
      
        // propsdata.current = ob;
        // console.log(ob)
        // return ref;
    }

    useEffect(() => {
    console.log(id+" haha "+data)
    // const dataarray=data.split("-");
    if(id in idlist.current){
    // var ob={};
  for(const [key,value] of Object.entries(idlist.current[id])){
propsdata.current[key]=[value];
// ob[key]=[value];
    }
    // console.log(ob)
    // propsdata.current=ob;


  
  addquery();
    }else{
        console.log("id does not exist");
       setwrongid(true);
    }


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
        settransitionopacity(true);
        var key = e.target.closest(".bottompadding").dataset.key;

        console.log(e.target.checked)

        var prev = propsdata.current;
        // if (!Object.keys(prev).includes(key)) {
        //     prev[key] = [];
        // }
        if (e.target.checked) {

            prev[key].push(e.target.id);
            console.log(prev[key])
        } else {

            prev[key] = prev[key].filter(ele => ele != e.target.id);
        }
        console.log(prev)
        // getshoeslist(prev);
        propsdata.current = prev;
        addquery();
        
    }




    const sizeclick = (e, value) => {
        var key = e.target.closest(".bottompadding").dataset.key;   
    settransitionopacity((res)=>{
        console.log("h1")
     return true;
    })


    setTimeout(() => {
    var keyarrayvalue=propsdata.current[key];
    if (keyarrayvalue.includes(value)) {
    console.log("sfasf" + value)
    keyarrayvalue = keyarrayvalue.filter((n) => n != value);
    } else {
    keyarrayvalue = [...keyarrayvalue, value]
    }
    console.log("h2")

    propsdata.current[key]=keyarrayvalue;
    console.log(propsdata.current[key])
    addquery();

    }, 0);


       
// var key = e.target.closest(".bottompadding").dataset.key;
//   if(key==="shoesizes"){
//         setselectedsizes((res) => {
//             console.log(res)
//             return statefun(res,key,ind);
//         })
//     }else{
//         setselectedcolors((res)=>{
//             return statefun(res,key,ind);
//         })
//     }

//     addquery();


        console.log(e.target)
    }


    const colorclick = (e, color) => {

            settransitionopacity((res)=>{
                console.log("h1")
             return true;
            })
      

setTimeout(() => {
        var ob=propsdata.current;
     if (ob["shoecolors"].includes(color)) {
        console.log("sfasf" + color)
        ob["shoecolors"] = ob["shoecolors"].filter((n) => n != color);
    } else {
        ob["shoecolors"] = [...ob["shoecolors"], color]
    }
    console.log("h2")

propsdata.current=ob;
console.log(propsdata.current["shoecolors"])
addquery();

}, 0);


 
    

//         setselectedcolors((res) => {

//             if (res.includes(color)) {
//                 console.log("sfasf" + color)
//                 res = res.filter((n) => n != color);
//             } else {
//                 res = [...res, color]
//             }

//             var prev = propsdata.current;
//             prev["shoecolors"] = [...res];
//             console.log(prev)
//             console.log(res)
//             // getshoeslist(prev);
//             propsdata.current = prev;
// console.log(propsdata.current["shoecolors"])
//             return res;
//         })


     



        console.log(e.target)
    }

    if(wrongid){
        return <Redirect to="/" />
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
                    Boolean(id.includes("tse")) ||
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
                        <div className="boxdiv"><label htmlFor="men"><span>Men</span><input type="checkbox" name="men" id="men" data-key="men" defaultChecked={id.includes("Mn")} onChange={(e) => { genderfun(e) }} /><span className="box" ></span></label> </div>
                        <div className="boxdiv"><label htmlFor="women"><span>Women</span><input type="checkbox" name="women" id="women" data-key="women" defaultChecked={id.includes("Wm")} onChange={(e) => { genderfun(e) }} /><span className="box" ></span></label> </div>
                        <div className="boxdiv"><label htmlFor="unisex"><span>Unisex</span><input type="checkbox" name="unisex" id="unisex" data-key="unisex" defaultChecked={id.includes("Ux")} onChange={(e) => { genderfun(e) }} /><span className="box"></span></label> </div>
                    </div>
                </div>

                <div className="sizelist">
                    <div className={minimizeclasssize.classNames} onClick={() => { setminimizeclasssize((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Size</h5>
                        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>

                    <div className="allsizes bottompadding" data-key="shoesizes">
                        {

                            shoesizeslist.map((ele) => {
                              
                                return <div className={propsdata.current["shoesizes"].includes(ele) ? "size sizeactive" : "size"} id={ele} onClick={(e) => { sizeclick(e, ele) }}>{ele}</div>
                            })
                        }

                    </div>

                </div>

                <div className="colorlist">
                    <div className={minimizeclasscolor.classNames} onClick={() => { setminimizeclasscolor((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Color</h5>
                        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>
                    <div className="allcolors bottompadding" data-key="shoecolors">


                        {shoecolorslist.map((ele) => {
                            return <div className="colorb" onClick={(e) =>sizeclick(e, ele)}><div className="circle" style={{ backgroundColor:ele, opacity: 0.85 }}> <div className={propsdata.current["shoecolors"].includes(ele) ? "tick tickactive" : "tick"} style={{ borderColor: ele === "white" ? "black" : "white" }}></div> </div>
                                <div className={propsdata.current["shoecolors"].includes(ele) ?"cnameactive":""} >{ele}</div></div>
                        })}


                    </div>
                </div>



                <div className="brandlist">
                    <div className={minimizeclassbrands.classNames} onClick={() => { setminimizeclassbrands((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}>    <h5>Brands</h5>  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </div>
                    <div className="bottompadding" data-key="brand">
                        <div className="boxdiv"><label htmlFor="nike"><span>Nike</span><input type="checkbox" name="nike" id="nike" defaultChecked={id.includes("Nk")} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                        <div className="boxdiv"><label htmlFor="puma"><span>Puma</span><input type="checkbox" name="puma" id="puma" defaultChecked={id.includes("Pm")} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                        <div className="boxdiv"><label htmlFor="skechers"><span>Skechers</span><input type="checkbox" name="skechers" id="skechers" defaultChecked={id.includes("Sk")} onClick={(e) => genderfun(e)} /><span className="box"></span></label> </div>
                    </div>
                </div>

            </span>
            <span className="shoelistbody" style={{opacity:transitionopacity?0.5:1}}>

                {listdata.map((ele)=>{

                
             return  <div className="norbox">
                    <div className="image">
                    <img src={ele.shoeimages[ele.shoecolors[0]]} alt="" />
                    </div>
                    <div className="details">
                        <p>{ele.shoename}</p>
                        <p className="subdetail">{ele.shoetype} shoe</p>
                        <p className="subdetail">{ele.shoecolors.length} Colors</p>
                        {/* <p>₹20,200</p> */}
                    </div>

                    <div className="seconddetails">
                        <div className="picturediv">
                            {
                                ele.shoecolors.map((color,index)=>{
                             return     <img src={ele.shoeimages[color][0]} onMouseOver={(e) => { addseconddetails(e) }} style={{ height: "40px", width: "40px" }} alt="" />
                           
                                })
                            }
                              </div>
                        {/* <p>₹20,200</p> */}
                    </div>
                    <p>₹{ele.shoecost}</p>
                </div>
             
            })
            }


            </span>
        </div>


        <Footern />
    </div>
}
)