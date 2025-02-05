import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import Input from "../../components/input/Input.jsx";
import Select from "../../components/select/Select.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import Button from "../../components/button/Button.jsx";
import "./NewPost.css";
import closeIcon from "../../assets/icons/close icon.svg"
import uploadIcon from "../../assets/icons/upload icon.svg"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {PostsContext} from "../../context/PostsContext.jsx";

function NewPost() {
    const [isDraft, toggleIsDraft] = useState(false);
    const [urls, setUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [postId, setPostId] = useState(0);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {fetchPosts} = useContext(PostsContext);

    function fileToUrl(event) {
        const files = event.target.files
        const fileArray = [...files];
        setFiles(fileArray);
        const urlsArray = fileArray.map((file) => {
            return {url: URL.createObjectURL(file), fileName: file.name,}
        })
        setUrls(urlsArray);
    }
        async function handleFormSubmit(data) {
            const token = localStorage.getItem('token');
            const formData = {...data, isDraft};

            try {
                const result = await axios.post("http://localhost:8080/posts", {
                    title: formData.title,
                    category: formData.category,
                    description: formData.description,
                    isDraft: formData.isDraft,
                },{
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setPostId(result.data.id);
                navigate("/account");
            } catch (e){
                console.error("er ging wat fout " + e);
            }
        }

    useEffect(() => {
        async function sendImage() {
            if (!postId || postId === 0) return;
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append("file", files[0]);

            try {
                const result = await axios.post(`http://localhost:8080/posts/${postId}/image`, formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data"
                        },
                    })
                console.log(result.data);
                fetchPosts();
            } catch (e) {
                console.error(e)
            }
        }
        void sendImage();
    }, [postId]);

    return (
        <main>
            <section className="outer-container">
                <div className="new-post-container">
                    <Button classname="icon-button close-form" type="button" img={closeIcon} alt="Sluit icoon" onClick={(() => navigate("/"))}/>
                    <form className="form-new-post"  onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-fields">
                            <div className="form-field-left">
                                <Input inputId="content" name="content" labelName="Upload foto's in png of jpeg" validationRules={{
                                    required: {value: true, message: "Je moet een foto uploaden"},
                                }} multiple="multiple" type="file" accept="image/png, image/jpeg" register={register}
                                       errors={errors} onChange={fileToUrl}>
                                     {/*6.5 react hook form watch functie*/}
                                    <img src={uploadIcon} alt="upload button"/>
                                </Input>

                                {urls.length > 0 && <span className="form-field-left">
                                <img className="preview-img" src={urls[0].url} alt="peview img"/>
                                <Button classname="icon-button delete-img" type="button" img={closeIcon}
                                        alt="Sluit icoon" onClick={(() => setUrls([]))}/>
                            </span>
                                }

                            </div>

                            <div className="form-field-right">
                                <Input className="text-field-red" inputId="title" name="title" labelName="Titel" validationRules={{
                                    required: !isDraft ? {value: true, message: "Titel is verplicht"} : false,
                                    minLength: !isDraft ? {
                                        value: 5,
                                        message: "Titel moet minstens 5 karakters bevatten"
                                    } : false,
                                    maxLength: !isDraft ? {
                                        value: 50,
                                        message: "Titel mag maximaal 50 karakters bevatten"
                                    } : false,
                                }} type="text" register={register} errors={errors}/>

                                <Select className="text-field-red" selectId="category" labelName="Categorie"
                                        validationRules={{
                                            required: !isDraft ? {
                                                value: true,
                                                message: "Je moet een categorie kiezen"
                                            } : false,
                                        }} options={["", "Truien", "Broeken", "Mutsen", "Sjaals", "Tassen", "Kuffels"]}
                                        register={register} errors={errors}/>

                                <Textarea className="text-field-red" textareaId="description" rows="9" labelName="Beschrijving"
                                          validationRules={{
                                              required: !isDraft ? {
                                                  value: true,
                                                  message: "Beschrijving is verplicht"
                                              } : false,
                                              minLength: !isDraft ? {
                                                  value: 5,
                                                  message: "Beschrijving moet minstens 5 karakters bevatten"
                                              } : false,
                                              maxLength: !isDraft ? {
                                                  value: 300,
                                                  message: "Beschrijving mag maximaal 300 karakters bevatten"
                                              } : false,
                                          }} register={register} errors={errors}/>
                            </div>
                        </div>
                        <div className="preview-buttons">
                            {urls.length > 1 ?
                                urls?.slice(1, 4).map((url) => {
                                    return <span key={url.name} className="placeholder-img"><img
                                        className="preview-img" src={url.url} alt="peview img"></img></span>
                                }) : <div className="placeholder">
                                    <div className="placeholder-img"></div>
                                    <div className="placeholder-img"></div>
                                    <div className="placeholder-img"></div>
                                </div>}
                            <div className="buttons">
                                <Button classname="text-button yellow" type="submit" onClick={() => toggleIsDraft(true)}
                                        text="Concept"/>
                                <Button classname="text-button orange" type="submit"
                                        onClick={() => toggleIsDraft(false)} text="Uploaden"/>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default NewPost;

