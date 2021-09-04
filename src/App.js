
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Shoelistings from './components/shoelistings';
import Productview from './components/productview';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom"
import { useEffect } from 'react';
import firebase from 'firebase';
import Footern from './components/footer';

function App() {



  return (
    <div >

<Router>
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
</Router>

  {/* <Home /> */}
  {/* <Shoelistings prop={{gender:"men"}}/> */}
  {/* <Productview prop={{shoecolor:"red"}}/> */}
    </div>
  );
}

export default App;
