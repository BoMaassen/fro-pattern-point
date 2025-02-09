import "./Comment.css"
import Button from "../button/Button.jsx";
import heartOutline from "../../assets/icons/Heart-outline.svg";
import arrowDownBlue from "../../assets/icons/arrow down-blue.svg";
import timeAgo from "../../helpers/timeAgo.js";

function Comment({img, alt, username, message, timeStamp, commentLikes}) {
    return <article className="comment">
        <img src={img} alt={alt}/>
        <div className="comment-text">
            <h5>@{username}</h5>
            <p className="message">{message}</p>
            <div className="comment-details">
                <p>{timeAgo(timeStamp)}</p> <p>reageren</p> <p>{commentLikes}</p>
                <Button classname="like-button" img={heartOutline} alt="like icoon" type="button"/>
            </div>
            <p className="sub-comments">lijst andere comments <img src={arrowDownBlue} alt="pijl icoon"/></p>
        </div>
    </article>
}

export default Comment;