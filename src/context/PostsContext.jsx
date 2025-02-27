import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContect.jsx";

export const PostsContext = createContext([]);

function PostsContextProvider({children}){
    const [posts, setPosts] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth){
            fetchPosts();
        }
    }, [isAuth]);

    async function fetchPosts(){
        const token = localStorage.getItem('token');
        const controller = new AbortController();
        toggleLoading(true);
        setError("");
        try {
            const result = await axios.get("http://localhost:8080/posts",
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    }})
            setPosts(result.data);
        }
        catch (e){
            setError("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
        } finally {
            toggleLoading(false);
        }
        return function cleanup(){
            controller.abort();
        }
    }

    const contextData = {
        posts,
        loading,
        error,
        fetchPosts,
    };

    return (
        <PostsContext.Provider value={contextData}>
            {children}
        </PostsContext.Provider>
    );
}
export default PostsContextProvider;