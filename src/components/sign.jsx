 import '../css files/sign.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

 export default function Sign(props){

    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [erremailmsg,seterremailmsg]=useState("");
    const [errpasswordmsg,seterrpasswordmsg]=useState("");
    const [errusernamemsg,seterrusernamemsg]=useState("");


    const inputemail=(value)=>{
    // setemail(e.target.value);
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!reg.test(value) || value.length===0){
      seterremailmsg("Please enter a valid email.");
      return false;
    }else{
        seterremailmsg("");
        return true;
    }
    }

    const inputpassword=(value)=>{
        let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/;
        if(!regex.test(value) || value.length===0){
         seterrpasswordmsg("Password should contain Uppercase, Lowercase, Digit and special character (min 6).")
         return false;
        }else{
            seterrpasswordmsg("");
            return true;
        }
    }

    const inputusername=(value)=>{
        let regex= /^([0-9]*[a-zA-Z]){3,}[0-9]*$/;
        if(!regex.test(value) || value.length===0){
            seterrusernamemsg("Enter valid username");
            return false;
        }else{
            seterrusernamemsg("");
            return true;
        }
    }

    const checklength=(inputstring)=>{
        return inputstring.length===0;
    }

    const userSignin=(e)=>{
        console.log(errpasswordmsg)
        e.preventDefault();
        let v1=inputpassword(password);
        let v2=inputemail(email);
        if(v1 && v2){
            console.log(errpasswordmsg)
            console.log("hehe")
        }
    }

    const userSignup=(e)=>{
        console.log(errpasswordmsg)
        e.preventDefault();
        let v1=inputpassword(password);
        let v2=inputemail(email);
        let v3=inputusername(username);
        if(v1 && v2 && v3){
            console.log(errpasswordmsg)
            console.log("hehe")
        }
    }
    

 
    return <div className="signcover">
{console.log("rendered"+props.signIn)}
    <div className="signbox">
        <button className="close" onClick={()=>{props.setactive(false)}}><FontAwesomeIcon  icon={faTimesCircle} size="2x" /></button>
        <h4>Shoestore</h4>
     {
     props.signIn?   <form onSubmit={(e)=>userSignin(e)}>
            <input value={email} onBlur={(e)=>inputemail(e.target.value)} style={!checklength(erremailmsg)? {borderColor:"#fe0000"}:{}} onChange={(e)=>{setemail(e.target.value)}}  type="text" placeholder="Email address"/>
           {!checklength(erremailmsg) && <p className="erMessage">{erremailmsg}</p>}
            <input value={password} onBlur={(e)=>inputpassword(e.target.value)} style={!checklength(errpasswordmsg)? {borderColor:"#fe0000"}:{}} onChange={(e)=>{setpassword(e.target.value)}}  type="text" placeholder="Password"/>
          {!checklength(errpasswordmsg) && <p className="erMessage">{errpasswordmsg}</p> }
            <button type="submit">Signin</button>
        </form>:
        <form onSubmit={(e)=>userSignup(e)}>
            <input value={email} onBlur={(e)=>inputemail(e.target.value)} style={!checklength(erremailmsg)? {borderColor:"#fe0000"}:{}}  onChange={(e)=>{setemail(e.target.value)}} type="text" placeholder="Email address"/>
            {!checklength(erremailmsg) &&   <p className="erMessage">{erremailmsg}</p>}
            <input value={password} onBlur={(e)=>inputpassword(e.target.value)} style={!checklength(errpasswordmsg)? {borderColor:"#fe0000"}:{}} onChange={(e)=>{setpassword(e.target.value)}}  type="text" placeholder="Password"/>
            {!checklength(errpasswordmsg) &&   <p className="erMessage">{errpasswordmsg}</p>}
            <input value={username}  onBlur={(e)=>inputusername(e.target.value)} style={!checklength(errusernamemsg)? {borderColor:"#fe0000"}:{}} onChange={(e)=>{setusername(e.target.value)}}  type="text" placeholder="Username"/>
            {!checklength(errusernamemsg) && <p className="erMessage">{errusernamemsg}</p>}
            <button type="submit">Signup</button>
        </form>
         }
         {props.signIn?
        <p>Not a member? <button onClick={()=>{props.setsignIn(false)}}>Join Us</button></p>:
        <p>Already a member? <button onClick={()=>{props.setsignIn(true)}}>Sign In</button></p>
         }
    </div>
</div>
 }