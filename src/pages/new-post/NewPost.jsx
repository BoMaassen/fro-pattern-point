function NewPost() {
    return <main>
        <h1>New post</h1>
        <section>
            <form>
                <label htmlFor="content-img">
                    Upload een foto
                </label>
                <input id="content-img" name="content-img" type="file" accept="image/png, image/jpeg"/>
                <label htmlFor="title">
                    Titel
                </label>
                <input id="title" name="title" type="text"/>
                <label htmlFor="category">
                    Categorie
                </label>
                <select id="category" name="category">
                    <option value="Truien">Truien</option>
                    <option value="Broeken">Broeken</option>
                    <option value="Mutsen">Mutsen</option>
                    <option value="Sjaals">Sjaals</option>
                    <option value="Tassen">Tassen</option>
                    <option value="Knuffels">Knuffels</option>
                </select>
                <label htmlFor="description">
                    Beschrijving
                </label>
                <textarea id="description" name="description"></textarea>
            </form>
        </section>
    </main>
}

export default NewPost;