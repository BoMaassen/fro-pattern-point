import {useForm} from "react-hook-form";
import {useState} from "react";
import Input from "../../components/input/Input.jsx";
import Select from "../../components/select/Select.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import Button from "../../components/button/Button.jsx";
import "./NewPost.css";
import closeIcon from "../../assets/icons/close icon.svg"
import uploadIcon from "../../assets/icons/upload icon.svg"
import {useNavigate} from "react-router-dom";
import axios from "axios";

function NewPost() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [isDraft, toggleIsDraft] = useState(false);
    const [urls, setUrls] = useState([]);


    function fileToUrl(event) {
        const files = event.target.files
        const fileArray = [...files];
        const urlsArray = fileArray.map((file) => {
            return {url: URL.createObjectURL(file), fileName: file.name,}
        })
        setUrls(urlsArray);
    }

   async function handleFormSubmit(data) {


       try {
           const result = await axios.post("http://localhost:8080/posts",
               {
               title: data.title,
               category: data.category,
               description: data.description,
               isDraft: data.isDraft,
               images: urls

               });
           console.log(result.data);
       } catch (e){
           console.log("er ging wat fout " + e);
       }

       navigate("/account");

    }

    return (
        <main>
            <section className="outer-container">
                <div className="new-post-container">
                    <Button classname="icon-button" type="button" img={closeIcon} alt="Sluit icoon"/>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-fields">
                            <div className="form-field-left">
                                <Input inputId="content-img" labelName="Upload foto's in png of jpeg" validationRules={{
                                    required: {value: true, message: "Je moet een foto uploaden"},
                                }} multiple="multiple" type="file" accept="image/png, image/jpeg" register={register}
                                       errors={errors} onChange={fileToUrl}>
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
                                <Input className="text-field-red" inputId="title" labelName="Titel" validationRules={{
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

                                <Textarea className="text-field-red" textareaId="description" labelName="Beschrijving"
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

