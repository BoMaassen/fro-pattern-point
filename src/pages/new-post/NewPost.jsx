import {useForm} from "react-hook-form";
import {useState} from "react";
import Input from "../../assets/components/input/Input.jsx";
import Select from "../../assets/components/select/Select.jsx";
import Textarea from "../../assets/components/textarea/Textarea.jsx";
import Button from "../../assets/components/button/Button.jsx";

function NewPost() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isDraft, toggleIsDraft] = useState(false);

    function handleFormSubmit(data) {
        const formData = {...data, isDraft};
        if (isDraft) {
            console.log("Concept opgeslagen:", formData);
        } else {
            console.log("Bericht geüpload:", formData);
        }
    }

    return (
        <main>
            <h1>New post</h1>
            <section>
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <Input inputId="content-img" labelName="Upload foto's in png of jpeg" validationRules={{
                        required: {value: true, message: "Je moet een foto uploaden"},
                    }} type="file" accept="image/png, image/jpeg" register={register} errors={errors}/>

                    <Input inputId="title" labelName="Titel" validationRules={{
                        required: !isDraft ? {value: true, message: "Titel is verplicht"} : false,
                        minLength: !isDraft ? {value: 5, message: "Titel moet minstens 5 karakters bevatten"} : false,
                        maxLength: !isDraft ? {value: 50, message: "Titel mag maximaal 50 karakters bevatten"} : false,
                    }} type="text" register={register} errors={errors}/>

                    <Select selectId="category" labelName="Categorie" validationRules={{
                        required: !isDraft ? {value: true, message: "Je moet een categorie kiezen"} : false,
                    }} options={["", "Truien", "Broeken", "Mutsen", "Sjaals", "Tassen", "Kuffels"]} register={register} errors={errors}/>

                    <Textarea textareaId="description" labelName="Beschrijving" validationRules={{
                        required: !isDraft ? {value: true, message: "Beschrijving is verplicht"} : false,
                        minLength: !isDraft ? {value: 5, message: "Beschrijving moet minstens 5 karakters bevatten"} : false,
                        maxLength: !isDraft ? {value: 300, message: "Beschrijving mag maximaal 300 karakters bevatten"} : false,
                    }} register={register} errors={errors} />

                    <Button type="submit" onClick={() => toggleIsDraft(true)} text="Concept"/>
                    <Button type="submit" onClick={() => toggleIsDraft(false)} text="Uploaden"/>

                </form>
            </section>
        </main>
    );
}

export default NewPost;
