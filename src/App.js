
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Shoelistings from './components/shoelistings';
import Productview from './components/productview';
import {BrowserRouter as Router, Route, Switch, useParams, Redirect} from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import Footern from './components/footer';
import {createClient} from "@supabase/supabase-js";
import { userAuth } from './components/userAuth';
import './functions/getcontext'
import Favourite from './components/favourite';
import Addcart from './components/addcart';
import Checkout from './components/checkout';
import Orders from './components/orders';

function App() {

  const [uid,setuid]=useState("");
  const checkUser=()=>{
    console.log("check user")
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
  
  let user=supabase.auth.user();
  if(user){
    console.log(user)
    value.current.uid=user.id;
    setuid(user.id);
    return user.id;
  }else{
    console.log("no user");
    value.current.uid="";
    setuid("");
    return "";
  }
   

  }
  const value=useRef({uid:uid,checkUser});

 useEffect(()=>{
  const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
  const supabaseapi=process.env.REACT_APP_SUPABASE_API;
  const supabase=createClient(superbaseURL,supabaseapi);

console.log(supabase.auth.user())
checkUser();
  }
  ,[])


  return (
    <div >

<Router>
  <userAuth.Provider  value={{uid,checkUser}}>
    {console.log("app js render")}
  <Switch>
    <Route exact path="/">
      <Home></Home>
    </Route>
    <Route path="/list/:data/:id">
      <Shoelistings />
    </Route>

    <Route path="/details/:shoename/:id/:colorindex">
     <Productview/>
    </Route>

    <Route path="/favourites"  >
    {uid?  <Favourite />  : <Redirect  to="/" />}
    </Route>

    <Route path="/cart">
    {uid?  <Addcart />  : <Redirect  to="/" />}
    </Route>

    <Route path="/checkout">
    {/* {uid?  <Checkout /> : <Redirect  to="/" />} */}
    <Checkout />
    </Route>

    <Route path="/orders">
    {/* {uid?  <Orders /> : <Redirect  to="/" />} */}
    <Orders />
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
