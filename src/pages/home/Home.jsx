import './Home.css'
import filterIcon from '../../assets/icons/Filter-icon.svg'
import arrowDown from '../../assets/icons/arrow down.svg'
import arrowButton from '../../assets/icons/arrow-button.svg'
import Masonry from 'masonry-layout';
import {useContext, useEffect, useState} from "react";
import imagesLoaded from "imagesloaded";
import Post from "../../components/post/Post.jsx";
import axios from "axios";
import {AuthContext} from "../../context/AuthContect.jsx";
import {Link} from "react-router-dom";

function Home() {
   const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        let masonryInstance;
        imagesLoaded('.feed-container', () => {
            masonryInstance = new Masonry('.feed-container', {
                itemSelector: ".post-large",
                columnWidth: ".post-large",
                gutter: 45,
            });
        });

        return () => {
            if (masonryInstance) {
                masonryInstance.destroy();
            }
        };

    }, [posts]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchPosts(){
            try {
                const result = await axios.get("http://localhost:8080/posts",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }})
                setPosts(result.data);
                console.log(result.data);
            }
            catch (e){
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }
        fetchPosts();

    }, []);


    return (
        <main>
            <section className="filter-menu">
                <button className="filter-button" type="button"><img src={filterIcon} alt="filter icoon"/>Filter
                </button>
                <div className="categories-container">
                    <button type="button">Alles</button>
                    <button type="button">Tassen</button>
                    <button type="button">Truien</button>
                    <button type="button">Broeken</button>
                    <button type="button">Mutsen</button>
                    <button type="button">Knuffles</button>
                    <button type="button">Sjaals</button>

                </div>
                <div className="right-section-container">
                    <button className="arrow-button" type="button"><img src={arrowButton} alt="pijl naar rechts icoon"/>
                    </button>
                    <button className="sort-button" type="button">Sorteren<img src={arrowDown}
                                                                               alt="pijl naar beneden icoon"/></button>
                </div>
            </section>
            <section className="feed-container">{posts.map((post) => {
                    return <div key={post.id}>
                        {post.image && <Link to={`/posts/${post.id}`}><Post className="post-large" title={post.title} img={post.image.url}
                            alt={post.image.title} profilePiture={user.userIcon} username={user.username}
                                             key={post.id}/></Link> }
                    </div>})}
            </section>
        </main>

    )
}

export default Home;
