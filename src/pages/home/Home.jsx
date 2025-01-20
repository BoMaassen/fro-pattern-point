import './Home.css'
import filterIcon from '../../assets/icons/Filter-icon.svg'
import arrowDown from '../../assets/icons/arrow down.svg'
import arrowButton from '../../assets/icons/arrow-button.svg'
import Masonry from 'masonry-layout';
import {useEffect, useState} from "react";
import imagesLoaded from "imagesloaded";
import Post from "../../components/post/Post.jsx";
import axios from "axios";

function Home() {
   const [posts, setPosts] = useState([]);

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
        async function fetchPosts(){
            try {
                const result = await axios.get("http://localhost:8080/posts")
                setPosts(result.data);
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
            <section className="feed-container">
                {posts.map((post)=> (
                    <Post className="post-large" title={post.title} img={post.images[0].url} alt={post.images[0].fileName} profilePiture={post.userIcon} username={post.username} key={post.id}/>
)
                )}
            </section>
        </main>

    )
}

export default Home;
