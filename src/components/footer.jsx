import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowLeft,faCalculator} from "@fortawesome/free-solid-svg-icons"
import "../css files/footer.css"
export default function Footern(){

    return <div>
        <div className="foot">
            <div className="points">
              <a href="">About Shoe store</a>
              <a href="">Help</a>
            </div>
            <div className="points">
            <a target="_blank" href="https://www.nike.com/in">About Nike</a>
            <a target="_blank" href="https://in.puma.com/">About Puma</a>
            <a target="_blank" href="https://www.skechers.in/">About Skechers</a>
            </div>
            <div className="allLinks"  style={{backgroundColor:"orange"}}>
                <a href=""><FontAwesomeIcon icon={faCalculator}/></a>
                <a href=""><FontAwesomeIcon icon={faArrowLeft}/></a>
                <a href=""><FontAwesomeIcon icon={faCalculator}/></a>
            </div>
        </div>
    </div>
}