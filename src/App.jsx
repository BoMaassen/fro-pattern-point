import './App.css'
import addIcon from './assets/Add Circle.svg' ;
import userIcon from './assets/User Circle Single.svg';
import magnifyingGlass from './assets/Magnifying Glass.svg'

function App() {

    return (
        <>
            <nav className="nav-bar">
                <h2 className="nav-logo">Pattern Point</h2>
                <div className="nav-search-bar">
                    <label htmlFor="searchbar">
                        <input id="searchbar" name="searchbar" placeholder="zoeken..."/>
                    </label>
                    <button type="button">
                        <img src={magnifyingGlass} alt='Vergrootglas icoon'/>
                    </button>
                </div>
                <div className="nav-icons">
                    <button className="user-icon" type="button">
                        <img src={addIcon} alt="Content uploaden icoon"/>
                    </button>
                    <button className="add-icon" type="button">
                        <img src={userIcon} alt="Profiel icoon"/>
                    </button>
                </div>
            </nav>
            <h2>titel 2</h2>
            <h3>titel 3</h3>
            <h4>titel 4</h4>
            <p>hello</p>
        </>
    )
}

export default App
