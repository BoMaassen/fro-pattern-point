import './Home.css'
import filterIcon from '../../assets/icons/Filter-icon.svg'
import arrowDown from '../../assets/icons/arrow down.svg'
import arrowButton from '../../assets/icons/arrow-button.svg'
import Masonry from 'masonry-layout';
import {useEffect} from "react";
import imagesLoaded from "imagesloaded";
import {posts} from "../../constance/posts.js";
import Post from "../../components/post/Post.jsx";

function Home() {

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
                    <Post className="post-large" title={post.title} img={post.imageSrc} alt={post.altText} profilePiture={post.userIcon} username={post.username} key={post.id}/>
)
                )}
            </section>
        </main>

    )
}

export default Home;
