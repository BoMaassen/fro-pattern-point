import "./PostDetails.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../../components/post/Post.jsx";
import userIconPlus from "../../assets/icons/user icon plus.svg"
import userIcon from "../../assets/icons/User Circle Single.svg"
import heart from "../../assets/icons/Heart.svg"
import addIcon from "../../assets/icons/Add Circle.svg"
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import closeIcon from "../../assets/icons/close icon.svg";
import arrowDown from "../../assets/icons/arrow down.svg"

function PostDetails() {
    const [postDetail, setPostDetail] = useState({});
    const [patterns, setPatterns] = useState([]);
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {
        const token = localStorage.getItem('token');
        try {
            const result = await axios.post(`http://localhost:8080/posts/${id}/comments`, {
                message: data.comment
            }, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            console.log(result.data.id);
        } catch (e) {
            console.log("er ging wat fout " + e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function fetchPost() {
            try {
                const result = await axios.get(`http://localhost:8080/posts/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    })
                setPostDetail(result.data);
            } catch (e) {
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchPost();

        async function fetchPatterns() {
            try {
                const result = await axios.get("http://localhost:8080/patterns",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    })
                setPatterns(result.data);
                console.log(result.data);
            } catch (e) {
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchPatterns();

        async function fetchComments() {
            try {
                const result = await axios.get(`http://localhost:8080/posts/${id}/comments`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    })
                setComments(result.data);
                console.log(result.data);
            } catch (e) {
                console.log("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchComments();

    }, []);


    return <main>
        <section className="post-detail-section">
            {postDetail.image && <article>
                <span className="post-img"><Button classname="icon-button close-form" type="button" img={closeIcon}
                                                   alt="Sluit icoon"/><img src={postDetail.image.url}
                                                                           alt={postDetail.image.fileName}/></span>
                <div className="post-details">
                    <img src={userIconPlus} alt="profiel foto"/>
                    <h4>@{postDetail.username}</h4>
                    <h4>7.5k volgers</h4>
                    <h2>{postDetail.title}</h2>
                    <p>{postDetail.description}</p>
                </div>
                <div className="comment-section">
                    {comments.length && comments.map((comment) => (
                        <article key={comment.id}>
                            <img src={userIcon} alt="profiel foto"/>
                            <h4>@{comment.username}</h4>
                            <p>{comment.message}</p>
                            <p>{comment.timeStamp}</p> <p>reageren</p> <p>{comment.likes}</p>
                            <p>lijst andere comments <img src={arrowDown} alt="pijl icoon"/></p>
                        </article>
                    ))}

                    <h4>22 reacties <img src={arrowDown} alt="pijl icoon"/></h4>
                    < form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Input className="text-field-red" inputId="comment" name="comment" type="text"
                               placeholder="Reageren..." register={register} errors={errors}/>
                        <Button classname="text-button orange" type="submit" text="->"/>
                    </form>

                    <Button classname="text-button orange" type="button" text={postDetail.likes} img={heart}
                            alt="hartjes icoon"/>
                    <Button classname="icon-button" type="button" img={addIcon} alt="plus icoon"/>

                </div>
            </article>}

        </section>
        <section className="patterns-post-section">
            <h1>Patronen voor dit idee</h1>
            {patterns.length > 0 && patterns.map((pattern) => (
                <Post key={pattern.id} title={pattern.title} username={pattern.username} img={pattern.image?.url}
                      alt={pattern.image?.fileName} className="post-large"/>
            ))}
        </section>
    </main>
}

export default PostDetails;
