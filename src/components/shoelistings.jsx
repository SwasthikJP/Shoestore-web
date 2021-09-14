import Navbar from "./navbar";
import Footern from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faChevronDown, faChevronUp, faSlidersH, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import {  Redirect, useParams } from "react-router-dom";
import "../css files/shoelistings.css";
import  {supabase} from "../functions/supabaseClient";

// export default withRouter( function Shoelistings(props) {
export default function Shoelistings(props) {

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
    console.log(propsdata.current)
    const {data,id}=useParams();
    const idlist=useRef({
        MnAs:{gender:"men"},
        MntseRn:{gender:"men",shoetype:"running"},
        MntseSk:{gender:"men",shoetype:"sneakers"},
        MntseBll:{gender:"men",shoetype:"jordan"},
        MnNk:{gender:"men",brand:"nike"},
        MnPm:{gender:"men",brand:"puma"},
        MnSk:{gender:"men",brand:"skechers"},
        WmnAs:{gender:"women"},
        WmntseRn:{gender:"women",shoetype:"running"},
        WmntseSk:{gender:"women",shoetype:"sneakers"},
        WmntseBll:{gender:"women",shoetype:"jordan"},
        WmnNk:{gender:"women",brand:"nike"},
        WmnPm:{gender:"women",brand:"puma"},
        WmnSk:{gender:"women",brand:"skechers"},
        MnNk:{gender:"men",brand:"nike"},
        WmnNk:{gender:"women",brand:"nike"},
        UnNk:{gender:"unisex",brand:"nike"},
        MnPm:{gender:"men",brand:"puma"},
        WmnPm:{gender:"women",brand:"puma"},
        UnPm:{gender:"unisex",brand:"puma"},
        MnSk:{gender:"men",brand:"skechers"},
        WmnSk:{gender:"women",brand:"skechers"},
        UnSk:{gender:"unisex",brand:"skechers"},
        PmAs:{brand:"puma"},
        NkAs:{brand:"nike"},
        SkAs:{brand:"skechers"},
        NktseRn:{brand:"nike",shoetype:"running"},
        NktseSk:{brand:"nike",shoetype:"sneakers"},
        NktseBll:{brand:"nike",shoetype:"jordan"},
        PmtseRn:{brand:"puma",shoetype:"running"},
        PmtseSk:{brand:"puma",shoetype:"sneakers"},
        SktseRn:{brand:"skechers",shoetype:"running"},
        SktseSk:{brand:"skechers",shoetype:"sneakers"},
    });
    const [transitionopacity,settransitionopacity]=useState(false);
    const setsorting=useRef({sort:false,ascend:true});
    const [gotopage,setgotopage]=useState(false);
    const [getdata,setgetdata]=useState({});
    const [showfilter,setshowfilter]=useState(false);
  


    const addquery = async() => {

  try{
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

        if(setsorting.current.sort){
           
                ref.order("shoecost",{ascending:setsorting.current.ascend})
            
        }

        
        const {data,error}=await ref;
            if(error) throw error;
            setlistdata(data);
          
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
    propsdata.current={
        brand:[],
        gender:[],
        shoecolors:[],
        shoesizes:[],
        shoetype:[]
    };
    if(id in idlist.current){
    // var ob={};
  for(const [key,value] of Object.entries(idlist.current[id])){
propsdata.current[key]=[value];
// ob[key]=[value];
    }
    // console.log(ob)
    // propsdata.current=ob;
setsorting.current={sort:false,ascend:true};

  
  addquery();
    }else{
        console.log("id does not exist");
    }
    
    console.log(props.location)
    }, [id]);

    const dropdown_fun = () => {
        setdropdown_classname((prev) => {
            return { classname: classNames("dropdown", { dropdown_effect: prev.effecton }), effecton: !prev.effecton };
        }
        );
    }

    const addseconddetails = (e,index2) => {

        e.target.closest(".norbox").dataset.key=index2;
        e.target.closest(".norbox").childNodes[0].firstChild.src = e.target.src;
    }


    const addclassfun = () => {
        setmaindivclass((prev) => {
            return { classNames: classNames("mainbody", { dt: prev.effecton }), effecton: !prev.effecton }
        })
    }

    const getcount=(ar)=>{
        if(ar.length!=0){
            return `(${ar.length})`;
        }
        return "";
    }

    const genderfun = (e) => {
        var value=e.currentTarget.id;

        settransitionopacity(true);

        setTimeout(() => {
            var key = e.target.closest(".bottompadding").dataset.key;
            var prev = propsdata.current;
            // if (!Object.keys(prev).includes(key)) {
            //     prev[key] = [];
            // }
            if (!prev[key].includes(value)) {
                prev[key].push(value);
                console.log(prev[key])
            } else {
    
                prev[key] = prev[key].filter(ele => ele != value);
            }
            console.log(prev)
            // getshoeslist(prev);
            propsdata.current = prev;
            addquery();
        }, 0);
     
        
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

    const sortcostlh=(ascend)=>{
        settransitionopacity((res)=>{
            console.log("h1");
            return true;
        });
        setTimeout(()=>{
    setsorting.current.sort=true;
    console.log("h2")
    setsorting.current.ascend=ascend;
    addquery();
},0)

    }


    const getsortingtype=()=>{
        if(setsorting.current.sort){
            if(setsorting.current.ascend){
                return <span><i>:</i> Price: Low-High</span>;
            }else{
                return <span><i>:</i> Price: High-Low</span>;
            }
        }
        return "";
    }

    const setdata=(e,ele)=>{
  console.log(e.currentTarget.dataset.key)
  setgetdata({ele:ele,key:e.currentTarget.dataset.key});
  setgotopage(true);
    }


    const filtercomp=(classname)=>{
        return  <div className={classname}>
          { Boolean(id.includes("tse")) ||
            <div className="typesofshoe">
                <div>Running</div>
                <div>Basketball</div>
                <div>Sneakers</div>

            </div>
        }

        <div className="genderlist">
            <div className={minimizeclassgender.classNames} style={id.includes("tse")?{borderTop:"none"}:{}} onClick={() => { setminimizeclassgender((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}>  <h5>Gender {getcount(propsdata.current.gender)}</h5>   <FontAwesomeIcon  icon={minimizeclassgender.effecton?faChevronUp:faChevronDown}></FontAwesomeIcon>
            </div>
            <div className="bottompadding" id="gender" data-key="gender">
            <div className="boxdiv" id="men"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["gender"].includes("men")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="gender">Men</span></div>
            <div className="boxdiv" id="women"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["gender"].includes("women")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="gender">Women</span></div>
            <div className="boxdiv" id="unisex"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["gender"].includes("unisex")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="gender">Unisex</span></div>

            </div>
        </div>

        <div className="sizelist">
            <div className={minimizeclasssize.classNames} onClick={() => { setminimizeclasssize((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Size {getcount(propsdata.current.shoesizes)}</h5>
                <FontAwesomeIcon icon={minimizeclasssize.effecton?faChevronUp:faChevronDown}></FontAwesomeIcon>
            </div>

            <div className="allsizes bottompadding" data-key="shoesizes">
                {

                    shoesizeslist.map((ele,index) => {
                      
                        return <div key={index} className={propsdata.current["shoesizes"].includes(ele) ? "size sizeactive" : "size"} id={ele} onClick={(e) => { sizeclick(e, ele) }}>{ele}</div>
                    })
                }

            </div>

        </div>

        <div className="colorlist">
            <div className={minimizeclasscolor.classNames} onClick={() => { setminimizeclasscolor((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}><h5>Color {getcount(propsdata.current.shoecolors)}</h5>
                <FontAwesomeIcon icon={minimizeclasscolor.effecton?faChevronUp:faChevronDown}></FontAwesomeIcon>
            </div>
            <div className="allcolors bottompadding" data-key="shoecolors">


                {shoecolorslist.map((ele,index) => {
                    return <div key={index} className="colorb" onClick={(e) =>sizeclick(e, ele)}><div className="circle" style={{ backgroundColor:ele, opacity: 0.85, border: ele === "white" ? "1px solid rgb(229, 229, 229)" : "none" }}> <div className={propsdata.current["shoecolors"].includes(ele) ? "tick tickactive" : "tick"} style={{ borderColor: ele === "white" ? "black" : "white" }}></div> </div>
                        <div className={propsdata.current["shoecolors"].includes(ele) ?"cnameactive":""} >{ele}</div></div>
                })}


            </div>
        </div>



        <div className="brandlist">
            <div className={minimizeclassbrands.classNames} onClick={() => { setminimizeclassbrands((prev) => { return { classNames: classNames("longdiv", { minimizediv: prev.effecton }), effecton: !prev.effecton } }); }}>    <h5>Brands {getcount(propsdata.current.brand)}</h5>  <FontAwesomeIcon icon={minimizeclassbrands.effecton?faChevronUp:faChevronDown}></FontAwesomeIcon>
            </div>
            <div className="bottompadding" data-key="brand">
            <div className="boxdiv" id="nike"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["brand"].includes("nike")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="brand">Nike</span></div>
            <div className="boxdiv" id="puma"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["brand"].includes("puma")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="brand">Puma</span></div>
            <div className="boxdiv" id="skechers"  onClick={(e) => { genderfun(e) }} ><div className={propsdata.current["brand"].includes("skechers")? "box2 box2active":"box2"}><div className="tick2"></div></div><span className="brand">Skechers</span></div>
            </div>
        </div> 
        </div>
    }


    if(gotopage){
      return  <Redirect push to={`/details/${getdata.ele.gender}'s-${getdata.ele.shoename.replace(/ /g,"-")}/${getdata.ele.id}/${getdata.key}`}></Redirect>
    }

    if(! (id in idlist.current)){
        return <Redirect to="/" />
    }

  

    return <div style={{position:"relative"}}>
        <Navbar signactive={false} signIn={true}/>
        <div className="infotab">
            <div>
                {!Boolean(id.includes("tse")) ||
                <p className="roots">{propsdata.current["shoetype"]} / Shoes</p>
              }
                <h3>{propsdata.current["gender"].length===1? propsdata.current.gender+"'s":""} {propsdata.current["shoetype"]} Shoes {getcount(listdata)}</h3>
            </div>
            <div className="cornerbut">
                <div className="hidefilter" style={{fontSize:"1.1rem"}} onClick={addclassfun}>{maindivclass.effecton?"Hide":"Show"} Filters <FontAwesomeIcon style={{margin:"0 0 0 3px"}} size="sm" icon={faSlidersH} /></div>
                <div className="select"  >

                    <p onClick={() => { dropdown_fun() }} >Sort By{getsortingtype()} <FontAwesomeIcon style={{margin:"0 0 0 3px"}} size="sm" icon={dropdown_classname.effecton?faChevronDown:faChevronUp} /></p>
                    <div className="dropdown_wrapper" style={{pointerEvents:dropdown_classname.effecton?"none":"auto"}}>
                        <div className={dropdown_classname.classname}>
                            {/* <button> Featured</button>
                            <button>Newest</button> */}
                            <button disabled={setsorting.current.sort && !setsorting.current.ascend} onClick={()=>{sortcostlh(false)}}>Price: High-Low</button>
                            <button disabled={setsorting.current.sort && setsorting.current.ascend} onClick={()=>{sortcostlh(true)}}>Price: Low-High</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="filterbut" onClick={()=>setshowfilter(true)}>Filter<FontAwesomeIcon style={{margin:"0 0 0 6px"}} size="sm" icon={faSlidersH}  /></button>
        </div>

        <div className={maindivclass.classNames}>
            {/* <button className="dt"></button> */}
            
            {console.log("shoelistings render")}
               {filtercomp("filterbody")}

            <div className="shoelistbody" style={{opacity:transitionopacity?0.5:1}}>

                {listdata.length!==0?
                listdata.map((ele,index)=>{
   
            
             return  <div className="norbox" key={index} data-key="0" onClick={(e)=>{setdata(e,ele)}} >
                    <div className="image">
                    <img   src={ele.shoeimages[ele.shoecolors[0]]} alt="" />
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
                                ele.shoecolors.map((color,index2)=>{
                             return     <img key={index2} src={ele.shoeimages[color][0]} onMouseOver={(e) => { addseconddetails(e,index2) }} style={{ height: "40px", width: "40px" }} alt="" />
                           
                                })
                            }
                              </div>
                        {/* <p>₹20,200</p> */}
                    </div>
                    <p>₹{ele.shoecost}</p>
               
             </div>
            }):
            <h3>Try other shoes :)</h3>
            }


            </div>
        </div>


        <Footern />
<div className="filterdivcover" style={{pointerEvents:showfilter?"auto":"none"}}>
<div className={showfilter? "filterdiv filterdiv_active":"filterdiv"}>
  <button onClick={()=>setshowfilter(false)} style={{position:"sticky",top:"0rem",left:"100%",backgroundColor:"transparent"}}><FontAwesomeIcon icon={faTimesCircle} size="2x"></FontAwesomeIcon></button>

    <h3 style={{marginBottom:"1rem"}}>Filter</h3>
    {filtercomp("")}
</div>
</div>
    </div>
}

// )