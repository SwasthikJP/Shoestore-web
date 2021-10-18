import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css files/footer.css";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons/faGithubSquare";
import { faInstagramSquare} from "@fortawesome/free-brands-svg-icons/faInstagramSquare";
import { faTwitterSquare} from "@fortawesome/free-brands-svg-icons/faTwitterSquare";

export default function Footern(){


    return <div>
        <div className="foot">
            <div className="points">
              <a href="https://github.com/SwasthikJP/Shoestore-web#readme" rel="noreferrer" target="_blank">About Shoe store</a>
              <a href="https://github.com/SwasthikJP/Shoestore-web#readme" rel="noreferrer" target="_blank">Help</a>
            </div>
            <div className="points">
            <a target="_blank" rel="noreferrer" href="https://www.nike.com/in">About Nike</a>
            <a target="_blank" rel="noreferrer" href="https://in.puma.com/">About Puma</a>
            <a target="_blank" rel="noreferrer" href="https://www.skechers.in/">About Skechers</a>
            </div>
            <div className="allLinks"  >
                <a aria-label="github link" rel="noreferrer" href="https://github.com/swasthikjp" target="_blank"><FontAwesomeIcon color="white" size="2x" icon={faGithubSquare}/></a>
                <a aria-label="twitter link" rel="noreferrer" href="https://twitter.com/swasthikjp" target="_blank"><FontAwesomeIcon  color="white"  size="2x" icon={faTwitterSquare}/></a>
                <a aria-label="instagram link" rel="noreferrer" href="https://www.instagram.com/swasthikjpgowda/" target="_blank" ><FontAwesomeIcon color="white"   size="2x" icon={faInstagramSquare}/></a>
            </div>
        </div>
    </div>
}