import {lazy,Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {  useState } from 'react';
import { userAuth } from './functions/userAuth';
import './custom_hooks/getcontext'
import {supabase} from "../src/functions/supabaseClient";
import {IKContext} from "imagekitio-react";
import ErrorBoundary from './components/errorBoundart';
const Home=lazy(()=>import('./routes/home'));
const Shoelistings=lazy(()=>import( './routes/shoelistings'));
const Productview =lazy(()=>import('./routes/productview'));
const Favourite =lazy(()=>import('./routes/favourite'));
const Addcart =lazy(()=>import('./routes/addcart'));
const Checkout  =lazy(()=>import('./routes/checkout'));
const Orders =lazy(()=>import('./routes/orders'));

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
  <IKContext urlEndpoint="https://ik.imagekit.io/34ckqvtm5wm/fb">
    <ErrorBoundary>
<Router>
  <userAuth.Provider  value={{uid,checkUser}}>
  <Suspense fallback={<div></div>}>
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
</Suspense>
  </userAuth.Provider>
</Router>
</ ErrorBoundary >
</IKContext>
    </div>
  );
}

export default App;
