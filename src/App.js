
import './App.css';
import Home from './components/home';
import Shoelistings from './components/shoelistings';
import Productview from './components/productview';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {  useState } from 'react';
import { userAuth } from './functions/userAuth';
import './custom_hooks/getcontext'
import Favourite from './components/favourite';
import Addcart from './components/addcart';
import Checkout from './components/checkout';
import Orders from './components/orders';
import {supabase} from "../src/functions/supabaseClient";

function App() {

  const [uid,setuid]=useState(()=>{
  return supabase.auth.user()??"";
  });


  const checkUser=()=>{
  let user=supabase.auth.user();
  if(user){
    setuid(user.id);
    return user.id;
  }else{
    setuid("");
    return "";
  }
   
  }



  return (
    <div >

<Router>
  <userAuth.Provider  value={{uid,checkUser}}>

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
    {uid?  <Checkout /> : <Redirect  to="/" />}
    {/* <Checkout /> */}
    </Route>

    <Route path="/orders">
    {uid?  <Orders /> : <Redirect  to="/" />}
    {/* <Orders /> */}
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
