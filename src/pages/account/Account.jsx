import "./Account.css";
import {posts} from "../../constance/posts.js";
import Post from "../../components/post/Post.jsx";
import {useEffect} from "react";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

function Account(){

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
    }, []);
    return ( <main>
<h1>Account</h1>
            <section className="account-container">
                <div className="post-overview" >
                    <div className="maps"><h2>placeholder voor buttons</h2></div>
                    <div className="overview"> {posts.map((post)=> (
                            <Post className="post-small" title={post.title} img={post.imageSrc} alt={post.altText} profilePiture={post.userIcon} username={post.username} key={post.id}/>
                        )
                    )}</div>
                </div>

                <div>
                <div className="user-card"><h2>placeholder voor user card</h2></div>  {/*user card*/}
                <div className="notifications"><h2>placeholder voor meldingen</h2></div> {/*meldingen*/}
                </div>

            </section>


        </main>

    )
}
export default Account;