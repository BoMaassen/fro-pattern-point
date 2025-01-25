import './Post.css';
import profilePicture from '../../assets/icons/User Circle Single.svg';
function Post({title, img, alt, username, className}) {
    return(
    <article className={className}>
        <span className="image-wrapper"><img src={img} alt={alt}/></span>
        <div className="post-info">
            <h3>{title}</h3>
            <div className="user-info">
                <img src={profilePicture} alt="Profiel foto"/>
                <p>@{username}</p>
            </div>
        </div>
    </article>
    )
}

export default Post;