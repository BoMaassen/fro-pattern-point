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

function NewPost() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [isDraft, toggleIsDraft] = useState(false);
    const [filePreviews, setFilePreview] = useState([]);

    function preview(event) {
        const files = event.target.files;
        const filePreviewArray = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                filePreviewArray.push(reader.result);
                setFilePreview((prevPreviews) => [...prevPreviews, reader.result]);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }

    }

    function handleFormSubmit(data) {
        const formData = {...data, isDraft};
        if (isDraft) {
            console.log("Concept opgeslagen:", formData);
        } else {
            console.log("Bericht geüpload:", formData);
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
                                   errors={errors} onChange={preview}>
                                <img src={uploadIcon} alt="upload button"/>
                            </Input>

                            {filePreviews.length > 0 &&  <span className="form-field-left">
                                <img className="preview-img" src={filePreviews[0]} alt="peview img"/>
                                <Button classname="icon-button delete-img" type="button" img={closeIcon}
                                        alt="Sluit icoon" onClick={(() => setFilePreview([]))}/>
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

                        <Select className="text-field-red" selectId="category" labelName="Categorie" validationRules={{
                            required: !isDraft ? {value: true, message: "Je moet een categorie kiezen"} : false,
                        }} options={["", "Truien", "Broeken", "Mutsen", "Sjaals", "Tassen", "Kuffels"]}
                                register={register} errors={errors}/>

                        <Textarea className="text-field-red" textareaId="description" labelName="Beschrijving" validationRules={{
                            required: !isDraft ? {value: true, message: "Beschrijving is verplicht"} : false,
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
                        {filePreviews.length > 1 ?
                            filePreviews?.slice(1, 4).map((filePreview) => {
                                return <span key={filePreview} className="placeholder-img"><img className="preview-img" src={filePreview}  alt="peview img" ></img></span>
                            }) : <div className="placeholder">
                                <div className="placeholder-img"></div>
                                <div className="placeholder-img"></div>
                                <div className="placeholder-img"></div>
                            </div>}
                        <div className="buttons">
                            <Button classname="text-button yellow" type="submit" onClick={() => toggleIsDraft(true)} text="Concept"/>
                            <Button classname="text-button orange" type="submit" onClick={() => toggleIsDraft(false)} text="Uploaden"/>
                        </div>
                    </div>
                </form>
                </div>
            </section>
        </main>
    );
}

export default NewPost;

