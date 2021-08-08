
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Shoelistings from './components/shoelistings';

function App() {
  return (
    <div >
  {/* <Home /> */}
  <Shoelistings prop={{gender:"men"}}/>
    </div>
  );
}

export default App;
