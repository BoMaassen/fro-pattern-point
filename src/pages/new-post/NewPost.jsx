import {useForm} from "react-hook-form";

function NewPost() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

    console.log(errors)

    return (
        <main>
            <h1>New post</h1>
            <section>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <label htmlFor="content-img">
                        Upload foto's in png of jpeg
                    </label>
                    <input id="content-img" {...register("content-img",
                        {
                            required: { value: true, message: "Je moet een foto uploaden"}
                        })
                    } type="file" accept="image/png, image/jpeg"/>
                    {errors['content-img'] && <p>{errors['content-img'].message}</p>}
                    <label htmlFor="title">
                        Titel
                    </label>
                    <input id="title" {...register("title", {required: { value: true, message: "Titel is verplicht"}, minLength:{ value: 5, message: "Titel moet minstens 5 karakters bevatten"}, maxLength:{ value: 50, message: "Titel mag maximaal 50 karakter bevatten "},})} type="text"/>
                    {errors.title && <p>{errors.title.message}</p>}
                    <label htmlFor="category">
                        Categorie
                    </label>
                    <select id="category" {...register("category", {required:{ value: true, message: "Je moet een categorie kiezen"},})}>
                        <option value="">-selecteer optie-</option>
                        <option value="Truien">Truien</option>
                        <option value="Broeken">Broeken</option>
                        <option value="Mutsen">Mutsen</option>
                        <option value="Sjaals">Sjaals</option>
                        <option value="Tassen">Tassen</option>
                        <option value="Knuffels">Knuffels</option>
                    </select>
                    {errors.category && <p>{errors.category.message}</p>}
                    <label htmlFor="description">
                        Beschrijving
                    </label>
                    <textarea id="description" {...register("description", {required:{ value: true, message: "Beschrijving is verplicht"}, minLength:{ value: 5, message: "Titel moet minstens 5 karakters bevatten"}, maxLength:{ value: 300, message: "Titel mag maximaal 300 karakter bevatten "},})}></textarea>
                    {errors.description && <p>{errors.description.message}</p>}
                    <button type="submit">
                        Uploaden
                    </button>
                </form>
            </section>
        </main>
    )
}

export default NewPost;