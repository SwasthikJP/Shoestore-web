
import './App.css';
import Home from './components/home';
import Shoelistings from './components/shoelistings';
import Productview from './components/productview';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {  useState } from 'react';
import {createClient} from "@supabase/supabase-js";
import { userAuth } from './functions/userAuth';
import './custom_hooks/getcontext'
import Favourite from './components/favourite';
import Addcart from './components/addcart';
import Checkout from './components/checkout';
import Orders from './components/orders';

function App() {

  const [uid,setuid]=useState(()=>{
    console.log("check user")
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
  
  let user=supabase.auth.user();
  if(user){
    console.log(user)
    return user.id;
  }else{
    console.log("no user");
    return "";
  }
  });
  const checkUser=()=>{
    console.log("check user")
    const superbaseURL=process.env.REACT_APP_SUPABASE_URL;
    const supabaseapi=process.env.REACT_APP_SUPABASE_API;
    const supabase=createClient(superbaseURL,supabaseapi);
  
  let user=supabase.auth.user();
  if(user){
    console.log(user)
    setuid(user.id);
    return user.id;
  }else{
    console.log("no user");
    setuid("");
    return "";
  }
   
  }



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
