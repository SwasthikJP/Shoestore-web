import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowLeft,faCalculator} from "@fortawesome/free-solid-svg-icons"
import "../css files/footer.css"
import { faGithub, faGithubSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
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
            <div className="allLinks"  >
                <a href="https://github.com/swasthikjp" target="_blank"><FontAwesomeIcon color="white" size="2x" icon={faGithubSquare}/></a>
                <a href="https://twitter.com/swasthikjp" target="_blank"><FontAwesomeIcon  color="white"  size="2x" icon={faTwitterSquare}/></a>
                <a href="https://www.instagram.com/swasthikjpgowda/" target="_blank" ><FontAwesomeIcon color="white"   size="2x" icon={faInstagramSquare}/></a>
            </div>
        </div>
    </div>
}