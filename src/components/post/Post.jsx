import './Post.css';
function Post({title, img, alt, profilePiture, username, key}) {
    return(
    <article key={key} className="post">
        <span className="image-wrapper"><img src={img} alt={alt}/></span>
        <div className="post-info">
            <h3>{title}</h3>
            <div className="user-info">
                <img src={profilePiture} alt="Profiel foto"/>
                <p>{username}</p>
            </div>
        </div>
    </article>
    )
}

export default Post;