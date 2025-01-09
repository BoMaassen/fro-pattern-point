import './Home.css'
import filterIcon from '../../assets/icons/Filter-icon.svg'
import arrowDown from '../../assets/icons/arrow down.svg'
import arrowButton from '../../assets/icons/arrow-button.svg'
import Masonry from 'masonry-layout';
import {useEffect} from "react";
import imagesLoaded from "imagesloaded";
import {posts} from "../../constance/posts.js";

function Home() {

    useEffect(() => {
        let masonryInstance;
        imagesLoaded('.feed-container', () => {
            masonryInstance = new Masonry('.feed-container', {
                itemSelector: ".post",
                columnWidth: ".post",
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
                    <article key={post.id} className="post">
                        <span className="image-wrapper"><img src={post.imageSrc} alt={post.altText}/></span>
                        <div className="post-info">
                            <h3>{post.title}</h3>
                            <div className="user-info">
                                <img src={post.userIcon} alt="Profiel foto"/>
                                <p>{post.username}</p>
                            </div>
                        </div>
                    </article>)
                )}
            </section>
        </main>

    )
}

export default Home;
