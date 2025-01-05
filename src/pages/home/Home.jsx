import './Home.css'
import filterIcon from '../../assets/Filter-icon.svg'
import arrowDown from '../../assets/arrow down.svg'
import arrowButton from '../../assets/arrow-button.svg'

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
        </main>

    )
}

export default Home;