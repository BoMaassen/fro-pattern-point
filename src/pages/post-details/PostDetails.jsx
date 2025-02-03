import "./PostDetails.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../../components/post/Post.jsx";
import userIconPlus from "../../assets/icons/user icon plus.svg"
import userIcon from "../../assets/icons/User Circle Single.svg"
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";

function PostDetails(){
    const [postDetail, setPostDetail] = useState({});
    const [patterns, setPatterns] = useState([]);
    const {id} = useParams();
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {
        const token = localStorage.getItem('token');
        try {
            const result = await axios.post(`http://localhost:8080/posts/${id}/comments`, {
               message: data.comment
            },{
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            console.log(result.data.id);
        } catch (e){
            console.log("er ging wat fout " + e);
        }
    }

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
                console.log(result.data);
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
                    <img src={userIconPlus} alt="profiel foto"/>
                    <h4>@{postDetail.username}</h4>
                    <h4>7.5k volgers</h4>
                    <h2>{postDetail.title}</h2>
                    <p>{postDetail.description}</p>
                </div>
                <div>
                    <article>
                        <img src={userIcon} alt="profiel foto"/>
                        <h4>@{postDetail.username}</h4>
                        <p>comment zelf</p>
                        <p>time stamp</p> <p>reageren</p> <p>likes</p>
                        <p>lengte lijst andere comments</p>
                    </article>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Input className="text-field-red" inputId="comment" name="comment" type="text" placeholder="Reageren..." register={register} errors={errors} />
                        <Button classname="text-button orange" type="submit" text="->"/>
                    </form>

                </div>
            </article>}

        </section>
        <section>
            <h1>Patronen voor dit idee</h1>
            {patterns.length > 0 && patterns.map((pattern) => (
                <Post key={pattern.id} title={pattern.title} username={pattern.username} img={pattern.image?.url} alt={pattern.image?.fileName} className="post-large"/>
            ))}
        </section>
    </main>
}

export default PostDetails;
