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
import arrowDownBlue from "../../assets/icons/arrow down-blue.svg"
import arrowDownWhite from "../../assets/icons/arrow down.svg"
import heartOutline from "../../assets/icons/Heart-outline.svg"

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

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            {postDetail.image && <article className="post-big">
                <span className="post-img">
                    <img src={postDetail.image.url} alt={postDetail.image.fileName}/>
                    <Button classname="icon-button close-post" type="button" img={closeIcon} alt="Sluit icoon"/>
                </span>
                <div className="details-comments">
                    <div className="post-details">
                        <div className="user-stats">
                            <img src={userIconPlus} alt="profiel foto"/>
                            <div>
                                <h4>@{postDetail.username}</h4>
                                <h4>7.5k volgers</h4>
                            </div>
                        </div>
                        <h2>{postDetail.title}</h2>
                        <p>{postDetail.description}</p>
                    </div>
                    <div className="comment-section">
                        {comments.length ? comments.map((comment) => (
                            <article className="comment" key={comment.id}>
                                <img src={userIcon} alt="profiel foto"/>
                                <div className="comment-text">
                                    <h5>@{comment.username}</h5>
                                    <p className="message">{comment.message}</p>
                                    <div className="comment-details">
                                        <p>{comment.timeStamp}</p> <p>reageren</p> <p>{comment.likes}</p><Button
                                        classname="like-button" img={heartOutline} alt="like icoon" type="button"/>
                                    </div>
                                    <p className="sub-comments">lijst andere comments <img src={arrowDownBlue}
                                                                                           alt="pijl icoon"/></p>
                                </div>
                            </article>
                        )) : <p>Schrijf een reactie voor deze post!</p>}
                        {comments.length > 0 && <h5>22 reacties <img src={arrowDownBlue} alt="pijl icoon"/></h5>}
                        <div className="interaction-part">
                            <form className="comment-form" onSubmit={handleSubmit(handleFormSubmit)}>
                                <Input className="text-field-red" inputId="comment" name="comment" type="text"
                                       placeholder="Reageren..." register={register} errors={errors}/>
                                <Button classname="comment-button blue interact-button" type="submit"
                                        img={arrowDownWhite} alt="pijl icoon"/>
                            </form>

                            <Button classname="interact-button like-button-big red" type="button"
                                    text={postDetail.likes} img={heart}
                                    alt="hartjes icoon"/>
                            <Button classname="interact-button" type="button" img={addIcon} alt="plus icoon"/>

                        </div>

                    </div>
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
