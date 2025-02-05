import './App.css'
import addIcon from './assets/icons/Add Circle.svg' ;
import userIcon from './assets/icons/User Circle Single.svg';
import magnifyingGlass from './assets/icons/Magnifying Glass.svg'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NewPost from "./pages/new-post/NewPost.jsx";
import Account from "./pages/account/Account.jsx";
import Button from "./components/button/Button.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/sign-up/SignUp.jsx";
import {AuthContext} from "./context/AuthContect.jsx";
import {useContext} from "react";
import NewPattern from "./pages/new-pattern/NewPattern.jsx";
import PostDetails from "./pages/post-details/PostDetails.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";


function App() {
    const navigate = useNavigate();
    const {isAuth} = useContext(AuthContext);

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
                <Route path="/" element={isAuth ? <Home/> : <Navigate to="/sign-up"/> }></Route>
                <Route path="/new-post" element={isAuth ? <NewPost/> : <Navigate to="/sign-up"/>}></Route>
                <Route path="/account" element={isAuth ? <Account/> : <Navigate to="/sign-up"/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/sign-up" element={<SignUp/>}></Route>
                <Route path="/new-pattern" element={isAuth ? <NewPattern/> : <Navigate to="/sign-up"/> }></Route>
                <Route path="/posts/:id" element={isAuth ? <PostDetails/> : <Navigate to="/sign-up"/> }></Route>
                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </>
    )
}

export default App
