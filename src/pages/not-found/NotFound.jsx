import "./NotFound.css";
import errorImg from "../../assets/error-img.webp"
import arrow from "../../assets/icons/arrow-button.svg"
import {Link} from "react-router-dom";

function NotFound() {
    return <main>
        <section className="not-found-section">
            <h1>Mamma mia! Deze pagina is verdwenen!</h1>
            <span className="error-img-container"><img src={errorImg} alt="mario kart banaan"/></span>
            <h2><Link to="/"> <img className="arrow-error-page" src={arrow} alt="pijl icon"/> Terug naar de home
                page</Link></h2>
        </section>
    </main>
}

export default NotFound;