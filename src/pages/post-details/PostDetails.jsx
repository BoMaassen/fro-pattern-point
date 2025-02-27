import "./PostDetails.css"
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Post from "../../components/post/Post.jsx";
import userIconPlus from "../../assets/icons/user icon plus.svg"
import userIcon from "../../assets/icons/User Circle Single.svg"
import heart from "../../assets/icons/Heart.svg"
import addIcon from "../../assets/icons/Add Circle.svg"
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import closeIcon from "../../assets/icons/close icon.svg";
import arrowDownBlue from "../../assets/icons/arrow down-blue.svg"
import arrowDownWhite from "../../assets/icons/arrow down.svg"
import Comment from "../../components/comment/Comment.jsx";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import InputFile from "../../components/input-file/InputFile.jsx";
import {AuthContext} from "../../context/AuthContect.jsx";

function PostDetails() {
    const [postDetail, setPostDetail] = useState({});
    const [patterns, setPatterns] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const {register, reset, handleSubmit, formState: {errors}} = useForm();

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
                console.error("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchPost();

        async function fetchComments() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(`http://localhost:8080/posts/${id}/comments`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    })
                setComments(result.data);
            } catch (e) {
                console.error("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchComments();

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function fetchPatterns() {
            try {
                const result = await axios.get(`http://localhost:8080/posts/${id}/patterns`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    })
                setPatterns(result.data);
            } catch (e) {
                console.error("Er ging iets mis met het ophalen van de posts probeer het opniew! " + e)
            }
        }

        fetchPatterns();
    }, [postDetail]);

    useEffect(() => {
        let masonryInstance;
        imagesLoaded(".patterns", () => {
            masonryInstance = new Masonry(".patterns", {
                itemSelector: ".post-large",
                columnWidth: ".post-large",
                gutter: 45,
            });
        });

        return () => {
            if (masonryInstance) {
                masonryInstance.destroy();
            }
        };
    }, [patterns]);

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
            setComments([...comments, result.data]);
            reset();
        } catch (e) {
            console.error("er ging wat fout " + e);
        }
    }

    return <main>
        <section className="post-detail-section">
            {postDetail.image && <article className="post-big">
                <span className="post-img">
                    <img src={postDetail.image.url} alt={postDetail.image.fileName}/>
                    <Button classname="icon-button close-post" type="button" img={closeIcon} alt="Sluit icoon"
                            onClick={(() => navigate("/"))}/>
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
                        <div className="comments">
                            {comments.length ? comments.map((comment) => (
                                <Comment key={comment.id} img={userIcon} alt="profiel foto" username={comment.username}
                                         message={comment.message} timeStamp={comment.timeStamp}
                                         commentLikes={comment.likes}/>
                            )) : <p>Schrijf een reactie voor deze post!</p>}
                            {comments.length > 0 && <h5>22 reacties <img src={arrowDownBlue} alt="pijl icoon"/></h5>}
                        </div>
                        <div className="interaction-part">
                            <form className="comment-form" onSubmit={handleSubmit(handleFormSubmit)}>
                                <InputFile className="text-field-red" inputId="comment" name="comment" type="text"
                                           placeholder="Reageren..." register={register} errors={errors}/>
                                <Button classname="comment-button blue interact-button" type="submit"
                                        img={arrowDownWhite} alt="pijl icoon"/>
                            </form>

                            <Button classname="interact-button like-button-big red" type="button"
                                    text={postDetail.likes} img={heart}
                                    alt="hartjes icoon"/>
                            {user && user.role === "PATROONMAKER" &&
                            <Button classname="interact-button" type="button" img={addIcon}
                                    onClick={() => navigate(`/posts/${id}/new-pattern`)} alt="plus icoon"/>}
                        </div>
                    </div>
                </div>
            </article>}

        </section>
        <section className="patterns-post-section">
            <h1>Patronen voor dit idee</h1>
            <div className="patterns">
                {patterns.length > 0 && patterns.map((pattern) => (
                    <Post key={pattern.id} title={pattern.title} username={pattern.username} img={pattern.image?.url}
                          alt={pattern.image?.fileName} className="post-large"/>
                ))}
            </div>
        </section>
    </main>
}

export default PostDetails;