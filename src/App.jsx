import './App.css'
import addIcon from './assets/icons/Add Circle.svg' ;
import userIcon from './assets/icons/User Circle Single.svg';
import magnifyingGlass from './assets/icons/Magnifying Glass.svg'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NewPost from "./pages/new-post/NewPost.jsx";
import Account from "./pages/account/Account.jsx";
import Button from "./components/button/Button.jsx";


function App() {
    const navigate = useNavigate();

    return (
        <>
            <header>
            <nav className="nav-bar">
                <h2 className="nav-logo"><Link to="/">Pattern Point</Link></h2>
                <div className="nav-search-bar">

                    <label htmlFor="searchbar">
                        <input id="searchbar" name="searchbar" placeholder="zoeken..."/>
                    </label>
                    <Button classname="search-button" type="button" img={magnifyingGlass} alt="Vergrootglas icoon"/>
                </div>
                <div className="nav-icons">
                    <Button classname="add-icon" type="button" img={addIcon} alt="Content uploaden icoon" onClick={() => {navigate("/new-post")}}/>
                    <Button classname="user-icon" type="button" img={userIcon} alt="Profiel icoon" onClick={() => {navigate("/account")}}/>
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
