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
            <a href="">About Nike</a>
            <a href="">About Puma</a>
            <a href="">About Skechers</a>
            </div>
            <div className="allLinks"  style={{backgroundColor:"orange"}}>
                <a href=""><FontAwesomeIcon icon={faCalculator}/></a>
                <a href=""><FontAwesomeIcon icon={faArrowLeft}/></a>
                <a href=""><FontAwesomeIcon icon={faCalculator}/></a>
            </div>
        </div>
    </div>
}