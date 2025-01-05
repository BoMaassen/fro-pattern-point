import './App.css'
import addIcon from './assets/Add Circle.svg' ;
import userIcon from './assets/User Circle Single.svg';
import magnifyingGlass from './assets/Magnifying Glass.svg'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";


function App() {

    return (
        <>
            <header>
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
            </header>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </>
    )
}

export default App
