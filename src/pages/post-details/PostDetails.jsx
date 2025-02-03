import "./PostDetails.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PostDetails(){
    const [postDetail, setPostDetail] = useState({});
    const [patterns, setPatterns] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchPost(){
            try {
                const result = await axios.get(`http://localhost:8080/posts/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }})
                setPostDetail(result.data);
            }
            catch (e){
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }
        fetchPost();

        async function fetchPatterns(){
            try {
                const result = await axios.get("http://localhost:8080/patterns",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }})
                setPatterns(result.data);
            }
            catch (e){
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }
        fetchPatterns();

    }, []);


    return<main>
        <section>
            {postDetail.image && <article>

                <span><img src={postDetail.image.url} alt={postDetail.image.fileName}/></span>
                <div>
                    <h4>@{postDetail.username}</h4>
                    <h4>7.5k volgers</h4>
                    <h2>{postDetail.title}</h2>
                    <p>{postDetail.description}</p>
                    </div>
                <div></div>
            </article>}

        </section>
        <section>
            <h1>Patronen voor dit idee</h1>
        </section>
    </main>
}

export default PostDetails;
