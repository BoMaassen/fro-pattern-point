import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import closeIcon from "../../assets/icons/close icon.svg";
import Input from "../../components/input/Input.jsx";
import uploadIcon from "../../assets/icons/upload icon.svg";
import progressBar1 from "../../assets/progress bar-1.svg";
import progressBar2 from "../../assets/progress bar-2.svg";
import progressBar3 from "../../assets/progress bar-3.svg";
import Select from "../../components/select/Select.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import addIcon from "../../assets/icons/Add Circle.svg";

function NewPattern(){
    const [isDraft, toggleIsDraft] = useState(false);
    const [urls, setUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [patternId, setPatternId] = useState(0);
    const [formStep, setFormStep] = useState(0);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();


    function fileToUrl(event) {
        const files = event.target.files
        const fileArray = [...files];
        setFiles(fileArray);
        const urlsArray = fileArray.map((file) => {
            return {url: URL.createObjectURL(file), fileName: file.name,}
        })
        setUrls(urlsArray);
    }

    function formStepPlus(){
        setFormStep(prevState => prevState + 1 )
    }

    function formStepMinus(){
        setFormStep(prevState => prevState - 1 )
    }


    async function handleFormSubmit(data) {
        const token = localStorage.getItem('token');
        const formData = {...data, isDraft};

        try {
            const result = await axios.post("http://localhost:8080/pattern", {
                title: formData.title,
                level: formData.level,
                description: formData.description,
                isDraft: formData.isDraft,
            },{
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            console.log(result.data.id);
            setPatternId(result.data.id);
            navigate("/account");
        } catch (e){
            console.log("er ging wat fout " + e);
        }
    }

    useEffect(() => {
        async function sendImage() {
            if (!patternId || patternId === 0) return;
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append("file", files[0]);
            console.log(files[0])

            try {
                const result = await axios.post(`http://localhost:8080/patterns/${patternId}/image`, formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data"
                        },
                    })
                console.log(result.data);
            } catch (e) {
                console.error(e)
            }
        }
        void sendImage();
    }, [patternId]);


    return (
        <main>
            <section className="outer-container">
                <div className="new-post-container">
                    {formStep === 0 && <img src={progressBar1} alt="progressie bar nieuw patroon"/>}
                    {formStep === 1 && <img src={progressBar2} alt="progressie bar nieuw patroon"/>}
                    {formStep === 2 && <img src={progressBar3} alt="progressie bar nieuw patroon"/>}
                    <Button classname="icon-button" type="button" img={closeIcon} alt="Sluit icoon"/>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        {formStep=== 0 && <div className="form-fields">
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

                                <Select className="text-field-red" selectId="level" labelName="Niveau"
                                        validationRules={{
                                            required: !isDraft ? {
                                                value: true,
                                                message: "Je moet een niveau kiezen"
                                            } : false,
                                        }} options={["", "Beginner", "Medium", "Gevorderd", "Expert"]}
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
                        </div>}

                        {formStep=== 1 && <div className="form-fields">
                            <div className="form-field-right">
                                <h2>Benodigdheden</h2>
                                <Select className="text-field-red" selectId="hookSize" labelName="Maat haaknaald"
                                        validationRules={{
                                            required: !isDraft ? {
                                                value: true,
                                                message: "Je moet een maat kiezen"
                                            } : false,
                                        }} options={["", "2.0", "2.5", "3.0", "3.5", "4.0","4.5", "5.0", "5.5", "6.0" ]}
                                        register={register} errors={errors}/>
                                <Input className="text-field-red" inputId="amountOfYarn" name="amountOfYarn" labelName="Aantal garen" validationRules={{
                                    required: !isDraft ? {value: true, message: "Aantal gram is verplicht"} : false,
                                    minLength: !isDraft ? {
                                        value: 1,
                                        message: "Aantal moet minstens 1 gram zijn"
                                    } : false,
                                }} type="text" register={register} errors={errors}/>
                                <Input className="text-field-red" inputId="typeYarn" name="typeYarn" labelName="Soort garen" type="text" register={register} errors={errors}/>
                                <Input inputId="scissor" name="scissor" labelName="Schaar" type="checkbox" value="scissor" register={register} errors={errors}/>
                                <Input inputId="darningNeedle" name="darningNeedle" labelName="Stopnaald" type="checkbox" value="darningNeedle" register={register} errors={errors}/>
                                <Input inputId="measuringTape" name="measuringTape" labelName="Meetlint" type="checkbox" value="measuringTape" register={register} errors={errors}/>

                            </div>
                            <div className="form-field-right">
                                <h2>Afkortingen</h2>
                                <div>
                                    <Input className="text-field-red" inputId="abbreviated" name="abbreviated"
                                           labelName="Afkorting 1" type="text" placeholder="Afgekort" register={register} errors={errors}/>
                                    <Input className="text-field-red" inputId="fullForm" name="fullForm" type="text" placeholder="Uitgeschreven" register={register} errors={errors}/>
                                </div>
                                <div>
                                    <Input className="text-field-red" inputId="abbreviated" name="abbreviated"
                                           labelName="Afkorting 2" type="text" placeholder="Afgekort" register={register} errors={errors}/>
                                    <Input className="text-field-red" inputId="fullForm" name="fullForm" type="text" placeholder="Uitgeschreven" register={register} errors={errors}/>
                                </div>
                                <div>
                                    <Input className="text-field-red" inputId="abbreviated" name="abbreviated"
                                           labelName="Afkorting 3" type="text" placeholder="Afgekort" register={register} errors={errors}/>
                                    <Input className="text-field-red" inputId="fullForm" name="fullForm" type="text" placeholder="Uitgeschreven" register={register} errors={errors}/>
                                </div>
                                <Button classname="add-icon" type="button" img={addIcon} alt="plus icoon"/>
                            </div>
                            <div className="form-field-right">
                                <h2>Afmetingen</h2>
                                <Input className="text-field-red" inputId="length" name="length" labelName="Lengte in cm" validationRules={{
                                    required: !isDraft ? {value: true, message: "Lengte is verplicht"} : false,
                                    min: !isDraft ? {
                                        value: 1,
                                        message: "Lengte moet minstens 1cm zijn"
                                    } : false,
                                }} type="text" register={register} errors={errors}/>
                                <Input className="text-field-red" inputId="width" name="width" labelName="Breedte in cm" validationRules={{
                                    required: !isDraft ? {value: true, message: "Breedte is verplicht"} : false,
                                    min: !isDraft ? {
                                        value: 1,
                                        message: "Breedte moet minstens 1cm zijn"
                                    } : false,
                                }} type="text" register={register} errors={errors}/>
                            </div>

                        </div>
                        }


                        {formStep === 2 && <div className="form-fields">
                            <div className="form-field-left">
                                <h3>form part 3</h3>
                            </div>
                        </div>
                        }
                        <div className="preview-buttons">
                        {formStep === 0 &&  <div>
                                {urls.length > 1 ?
                                urls?.slice(1, 4).map((url) => {
                                    return <span key={url.name} className="placeholder-img"><img
                                        className="preview-img" src={url.url} alt="peview img"></img></span>
                                }) : <div className="placeholder">
                                    <div className="placeholder-img"></div>
                                    <div className="placeholder-img"></div>
                                    <div className="placeholder-img"></div>
                                </div>}
                            </div> }
                            {formStep > 0 && <div className="buttons">
                                <Button classname="text-button blue" type="button"
                                        onClick={formStepMinus} text="Terug"/>
                            </div>}
                            <div className="buttons">
                                <Button classname="text-button yellow" type="submit" onClick={() => toggleIsDraft(true)}
                                        text="Concept"/>

                                {formStep < 2 &&
                                    <Button classname="text-button orange" type="Button"
                                            onClick={formStepPlus} text="Volgende"/>}
                                {formStep === 2 &&
                                <Button classname="text-button orange" type="submit" text="Uploaden"/>}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );


}

export default NewPattern;