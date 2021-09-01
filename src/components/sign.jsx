 import '../css files/sign.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

 export default function Sign(){

    return <div className="signcover">
    <div className="signbox">
        <button className="close"><FontAwesomeIcon  icon={faTimesCircle} size="2x" /></button>
        <h4>Shoestore</h4>
        <form action="">
            <input type="text" placeholder="Email address"/>
            <input type="text" placeholder="Password"/>
            <button type="submit">Signin</button>
        </form>
        <p>Not a member? <button>Join Us</button></p>
    </div>
</div>
 }