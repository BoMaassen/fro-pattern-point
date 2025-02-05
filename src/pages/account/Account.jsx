import "./Account.css";
import Post from "../../components/post/Post.jsx";
import {useContext, useEffect} from "react";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import {AuthContext} from "../../context/AuthContect.jsx";
import {PostsContext} from "../../context/PostsContext.jsx";
import {Link} from "react-router-dom";

function Account(){
    const {user} = useContext(AuthContext);
    const {posts} = useContext(PostsContext);

    useEffect(() => {
        let masonryInstance;
        imagesLoaded('.overview', () => {
            masonryInstance = new Masonry('.overview', {
                itemSelector: ".post-small",
                columnWidth: ".post-small",
                gutter: 15,
            });
        });

        return () => {
            if (masonryInstance) {
                masonryInstance.destroy();
            }
        };
    }, [posts]);


    return ( <main>
<h1>Account</h1>
            <section className="account-container">
                <div className="post-overview" >
                    <div className="maps"><h2>placeholder voor buttons</h2></div>
                    <div className="overview"> {posts.map((post) => {
                        return <div key={post.id}>
                            {post.image && <Link to={`/posts/${post.id}`}><Post className="post-small" title={post.title} img={post.image.url}
                                                 alt={post.image.title} profilePiture={user.userIcon} username={post.username}
                                                 key={post.id}/></Link>}
                        </div>
                    })}
                    </div>
            </div>

        <div>
            <div className="user-card"><h2>{user.username} {user.biography} </h2></div>
            {/*user card*/}
            <div className="notifications"><h2>placeholder voor meldingen</h2></div> {/*meldingen*/}
                </div>

            </section>



        </main>

    )
}
export default Account;