import './Home.css'
import filterIcon from '../../assets/icons/Filter-icon.svg'
import arrowDown from '../../assets/icons/arrow down.svg'
import arrowButton from '../../assets/icons/arrow-button.svg'
import bag from '../../assets/post-img/bag.jpg'
import beanie from '../../assets/post-img/beanie.jpg'
import scarf from '../../assets/post-img/scarf.jpg'
import sweater from '../../assets/post-img/sweater.jpg'
import userIcon from '../../assets/icons/User Circle Single.svg'

function Home() {
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
                <article className="post">
                    <span className="image-wrapper"><img src={beanie} alt="Gehaakte muts"/></span>
                    <div className="post-info">
                        <h3>Fisher hat beanie</h3>
                        <div className="user-info">
                            <img src={userIcon} alt="Profiel foto"/>
                            <p>@user1</p>
                        </div>
                    </div>
                </article>
            </section>
        </main>

    )
}

export default Home;