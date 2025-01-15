import './App.css'
import addIcon from './assets/icons/Add Circle.svg' ;
import userIcon from './assets/icons/User Circle Single.svg';
import magnifyingGlass from './assets/icons/Magnifying Glass.svg'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NewPost from "./pages/new-post/NewPost.jsx";
import Account from "./pages/account/Account.jsx";
import Button from "./components/button/Button.jsx";





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
                    

                    <Button classname="search-button" type="button" img={magnifyingGlass} alt="Vergrootglas icoon"/>
                </div>
                <div className="nav-icons">
                    <Button classname="add-icon" type="button" img={addIcon} alt="Content uploaden icoon"/>
                    <Button classname="user-icon" type="button" img={userIcon} alt="Profiel icoon"/>
                </div>
            </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/new-post" element={<NewPost/>}></Route>
                <Route path="/account" element={<Account/>}></Route>
            </Routes>
        </>
    )
}

export default App
