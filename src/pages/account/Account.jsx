import "./Account.css";
import Post from "../../components/post/Post.jsx";
import {useContext, useEffect, useState} from "react";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import axios from "axios";
import {AuthContext} from "../../assets/context/AuthContect.jsx";

function Account(){
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);


    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchPosts(){
            try {
                const result = await axios.get("http://localhost:8080/posts", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    }})
                setPosts(result.data);
            }
            catch (e){
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }
        fetchPosts();

    }, []);


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
                    <div className="overview"> {posts.map((post)=> (
                            <Post className="post-small" title={post.title} img={post.images[0].url} alt={post.images[0].fileName} username={user.username} key={post.id}/>
                        )
                    )}</div>
                </div>

                <div>
                <div className="user-card"><h2>{user.username} {user.biography} </h2></div>  {/*user card*/}
                <div className="notifications"><h2>placeholder voor meldingen</h2></div> {/*meldingen*/}
                </div>

            </section>


        </main>

    )
}
export default Account;