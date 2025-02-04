import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {data, useNavigate} from "react-router-dom";
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
import "./NewPattern.css";

function NewPattern() {
    const [isDraft, toggleIsDraft] = useState(false);
    const [urls, setUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [patternId, setPatternId] = useState(0);
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormdata] = useState({});
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

    function formStepPlus() {
        setFormStep(prevState => prevState + 1)
    }

    function formStepMinus() {
        setFormStep(prevState => prevState - 1)
    }


   async function handleFormSubmit(data) {
         const token = localStorage.getItem('token');
        console.log(data);
        setFormdata(data);

        try {
            const result = await axios.post("http://localhost:8080/patterns", {
                title: data.title,
                level: data.level,
                description: data.description,
                hookSize: data.hookSize,
                amountOfYarn: data.amountOfYarn,
                typeYarn: data.typeYarn,
                scissor :data.scissor,
                darningNeedle: data.darningNeedle,
                measuringTape: data.measuringTape,
                length: data.length,
                width: data.width,
            }, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            console.log(result.data.id);
            setPatternId(result.data.id);
            /*navigate("/account");*/
        } catch (e) {
            console.log("er ging wat fout " + e);
        }
    }

    useEffect(() => {
        if (!patternId || patternId === 0) return;
        const token = localStorage.getItem('token');
        async function sendImage() {

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

        async function sendSteps() {

            try {
                const result = await axios.post(`http://localhost:8080/patterns/${patternId}/steps`,
                    [
                        {
                        title: formData.titleStep1,
                        description: formData.descriptionStep1
                    }, {
                        title: formData.titleStep2,
                        description: formData.descriptionStep2
                    }
                    ]
                    ,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json"
                        },
                    })
                console.log(result.data);
            } catch (e) {
                console.error(e)
            }
        }
        async function sendAbbreviations() {

            try {
                const result = await axios.post(`http://localhost:8080/patterns/${patternId}/abbreviations`,
                    [
                        {
                            abbreviated: formData.abbreviated1,
                            fullForm: formData.fullForm1
                    }, {
                        abbreviated: formData.abbreviated2,
                        fullForm: formData.fullForm2
                    }
                    ]
                    ,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json"
                        },
                    })
                console.log(result.data);
            } catch (e) {
                console.error(e)
            }
        }

        void sendImage();
        void sendSteps();
        void sendAbbreviations();
    }, [patternId]);


    return (
        <main>
            <section className="outer-container">
                <div className="new-post-container">
                    {formStep === 0 && <img src={progressBar1} alt="progressie bar nieuw patroon"/>}
                    {formStep === 1 && <img src={progressBar2} alt="progressie bar nieuw patroon"/>}
                    {formStep === 2 && <img src={progressBar3} alt="progressie bar nieuw patroon"/>}
                    <Button classname="icon-button close-form" type="button" img={closeIcon} alt="Sluit icoon" onClick={(() => navigate("/"))}/>
                    <form className="form-new-pattern" onSubmit={handleSubmit(handleFormSubmit)}>
                        {formStep === 0 && <div className="form-fields">
                            <div className="form-field-left">
                                <Input inputId="content" name="content" labelName="Upload foto's in png of jpeg"
                                       validationRules={{
                                           required: {value: true, message: "Je moet een foto uploaden"},
                                       }} multiple="multiple" type="file" accept="image/png, image/jpeg"
                                       register={register}
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
                                <Input className="text-field-red" inputId="title" name="title" labelName="Titel"
                                       validationRules={{
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
                        </div>}

                        {formStep === 1 && <div className="pattern-part2">
                            <div className="form-accessories">

                                <h2>Benodigdheden</h2>
                                <div className="accessories-fields">
                                    <Select className="text-field-red field-row" selectId="hookSize"
                                            labelName="Maat haaknaald"
                                            validationRules={{
                                                required: !isDraft ? {
                                                    value: true,
                                                    message: "Je moet een maat kiezen"
                                                } : false,
                                            }}
                                            options={["", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0"]}
                                            register={register} errors={errors}/>
                                    <Input className="text-field-red field-row" inputId="amountOfYarn"
                                           name="amountOfYarn"
                                           labelName="Aantal garen" validationRules={{
                                        required: !isDraft ? {value: true, message: "Aantal gram is verplicht"} : false,
                                        min: !isDraft ? {
                                            value: 1,
                                            message: "Aantal moet minstens 1 gram zijn"
                                        } : false,
                                    }} type="number" register={register} errors={errors}/>
                                    <Input className="text-field-red field-row" inputId="typeYarn" name="typeYarn"
                                           labelName="Soort garen" type="text" register={register} errors={errors}/>
                                    <div className="checkbox">
                                        <Input inputId="scissor" name="scissor" labelName="Schaar" type="checkbox"
                                               register={register} errors={errors}/>
                                        <Input inputId="darningNeedle" name="darningNeedle" labelName="Stopnaald"
                                               type="checkbox" register={register}
                                               errors={errors}/>
                                        <Input inputId="measuringTape" name="measuringTape" labelName="Meetlint"
                                               type="checkbox" register={register} errors={errors}/>
                                    </div>

                                </div>

                            </div>
                            <div className="form-abbreviations">
                                <h2>Afkortingen</h2>
                                <div className="abbreviations-fields">
                                    <div className="abbreviations">
                                        <Input className="text-field-red field-row" inputId="abbreviated1"
                                               name="abbreviated1"
                                               labelName="Afkorting 1" type="text" placeholder="Afgekort"
                                               register={register} errors={errors}/>
                                        <Input className="text-field-red field-row" inputId="fullForm1" name="fullForm1"
                                               type="text"
                                               placeholder="Uitgeschreven" register={register} errors={errors}/>
                                    </div>
                                    <div className="abbreviations">
                                        <Input className="text-field-red field-row" inputId="abbreviated2"
                                               name="abbreviated2"
                                               labelName="Afkorting 2" type="text" placeholder="Afgekort"
                                               register={register} errors={errors}/>
                                        <Input className="text-field-red field-row" inputId="fullForm2" name="fullForm2"
                                               type="text"
                                               placeholder="Uitgeschreven" register={register} errors={errors}/>
                                    </div>
                                    <div className="abbreviations">
                                        <Input className="text-field-red field-row" inputId="abbreviated3"
                                               name="abbreviated3"
                                               labelName="Afkorting 3" type="text" placeholder="Afgekort"
                                               register={register} errors={errors}/>
                                        <Input className="text-field-red field-row" inputId="fullForm3" name="fullForm3"
                                               type="text"
                                               placeholder="Uitgeschreven" register={register} errors={errors}/>
                                    </div>
                                    <Button classname="add-icon" type="button" img={addIcon} alt="plus icoon"/>
                                </div>
                            </div>
                            <div className="form-measurments">
                                <h2>Afmetingen</h2>
                                <div className="measurments-fields">
                                    <Input className="text-field-red field-row" inputId="length" name="length"
                                           labelName="Lengte in cm" validationRules={{
                                        required: !isDraft ? {value: true, message: "Lengte is verplicht"} : false,
                                        min: !isDraft ? {
                                            value: 1,
                                            message: "Lengte moet minstens 1cm zijn"
                                        } : false,
                                    }} type="number" register={register} errors={errors}/>
                                    <Input className="text-field-red field-row" inputId="width" name="width"
                                           labelName="Breedte in cm"
                                           validationRules={{
                                               required: !isDraft ? {
                                                   value: true,
                                                   message: "Breedte is verplicht"
                                               } : false,
                                               min: !isDraft ? {
                                                   value: 1,
                                                   message: "Breedte moet minstens 1cm zijn"
                                               } : false,
                                           }} type="number" register={register} errors={errors}/>
                                </div>
                            </div>

                        </div>
                        }


                        {formStep === 2 && <div className="pattern-part3">
                            <div className="part3-left">
                                <div className="video-field">
                                    <img src={uploadIcon} alt="upload button"/>
                                    <h3>upload een video</h3>
                                </div>
                                <div className="chapters">
                                    <h2>Hoofdtukken</h2>
                                    <div>
                                    <Input className="text-field-red time" inputId="startStep1" name="startStep1"
                                           labelName="Stap 1" type="text" placeholder="mm:ss" register={register}
                                           errors={errors}/>
                                    <Input className="text-field-red time" inputId="startStep2" name="startStep2"
                                           labelName="Stap 2" type="text" placeholder="mm:ss" register={register}
                                           errors={errors}/>
                                    </div>
                                </div>
                            </div>

                            <div className="steps">
                                <div className="step">
                                    <Input className="text-field-red" inputId="titleStep1" name="titleStep1"
                                           labelName="Stap 1"
                                           validationRules={{
                                               required: !isDraft ? {
                                                   value: true,
                                                   message: "Titel is verplicht"
                                               } : false,
                                               minLength: !isDraft ? {
                                                   value: 5,
                                                   message: "Titel moet minstens 5 karakters bevatten"
                                               } : false,
                                               maxLength: !isDraft ? {
                                                   value: 50,
                                                   message: "Titel mag maximaal 50 karakters bevatten"
                                               } : false,
                                           }} type="text" register={register} errors={errors}/>

                                    <Textarea className="text-field-red" textareaId="descriptionStep1"
                                              labelName="Beschrijving" rows="4"
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


                                <div className="step">
                                    <Input className="text-field-red" inputId="titleStep2" name="titleStep2"
                                           labelName="Stap 2"
                                           validationRules={{
                                               required: !isDraft ? {
                                                   value: true,
                                                   message: "Titel is verplicht"
                                               } : false,
                                               minLength: !isDraft ? {
                                                   value: 5,
                                                   message: "Titel moet minstens 5 karakters bevatten"
                                               } : false,
                                               maxLength: !isDraft ? {
                                                   value: 50,
                                                   message: "Titel mag maximaal 50 karakters bevatten"
                                               } : false,
                                           }} type="text" register={register} errors={errors}/>

                                    <Textarea className="text-field-red" textareaId="descriptionStep2"
                                              labelName="Beschrijving" rows="4"
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
                                <Button classname="add-icon add-step" type="button" img={addIcon} alt="plus icoon"/>
                            </div>
                        </div>
                        }
                        <div className="preview-buttons">
                            {formStep === 0 && <div>
                                {urls.length > 1 ?
                                    urls?.slice(1, 4).map((url) => {
                                        return <span key={url.name} className="placeholder-img"><img
                                            className="preview-img" src={url.url} alt="peview img"></img></span>
                                    }) : <div className="placeholder">
                                        <div className="placeholder-img"></div>
                                        <div className="placeholder-img"></div>
                                        <div className="placeholder-img"></div>
                                    </div>}
                            </div>}
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
                                    <Button classname="text-button orange" type="submit" text="Uploaden"
                                            onClick={handleSubmit(handleFormSubmit)}/>}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );


}

export default NewPattern;