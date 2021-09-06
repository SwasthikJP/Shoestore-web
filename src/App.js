
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Shoelistings from './components/shoelistings';
import Productview from './components/productview';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import Footern from './components/footer';
import {createClient} from "@supabase/supabase-js";
import { userAuth } from './components/userAuth';
import './functions/getcontext'

function App() {

  const [uid,setuid]=useState("");
  const checkUser=()=>{
    console.log("check user")
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
  
  let user=supabase.auth.user();
    setuid((prev)=>{
      if(user){
        value.current.uid=user.id;
        return user.id;
      }else{
        value.current.uid="";
        return "";
      }
    });

  }
  const value=useRef({uid:uid,checkUser});

 useEffect(()=>{
  const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
  const supabaseapi=process.env.REACT_APP_SUPABASE_API;
  const supabase=createClient(superbaseURL,supabaseapi);

console.log(supabase.auth.user().id)
  }
  ,[])



  return (
    <div >

<Router>
  <userAuth.Provider  value={value.current}>
  <Switch>
    <Route exact path="/">
      <Home></Home>
    </Route>
    <Route path="/list/:data/:id">
      <Shoelistings />
    </Route>

    <Route path="/details/:shoename/:id/:colorindex">
     <Productview prop={{shoecolor:"red"}}/>
    </Route>

  </Switch>
  </userAuth.Provider>
</Router>

  {/* <Home /> */}
  {/* <Shoelistings prop={{gender:"men"}}/> */}
  {/* <Productview prop={{shoecolor:"red"}}/> */}
    </div>
  );
}

export default App;
