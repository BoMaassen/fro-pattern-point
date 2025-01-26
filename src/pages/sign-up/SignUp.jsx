import './SignUp.css';
import profilePicture from "../../assets/icons/User Circle blue.svg";
import Input from "../../components/input/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import Textarea from "../../components/textarea/Textarea.jsx";


function SignUp(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    async function handleSignUpSubmit(data) {
        try {
            await axios.post(
                "http://localhost:8080/users",
                {
                    username: data.username,
                    password: data.password,
                    role: data.role,
                    email: data.email,
                    biography: data.biography,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Succesvol geregistreerd");
           /* navigate("/login")*/
        } catch (e) {
            console.error(e + " Er ging wat fout met het ophalen")
        }
    }

    return <main>
        <section className="sign-up-section">
            <form onSubmit={handleSubmit(handleSignUpSubmit)} className="sign-up-form">
                <div className="upper-part">
                    <img src={profilePicture} alt="Profiel foto"/>
                    <div className="fields">
                        <Textarea className="text-field-red form-field" textareaId="biography" labelName="Bio" register={register} errors={errors}/>
                        <Input className="text-field-red form-field" inputId="username" name="username" labelName="Gebruikersnaam"
                               validationRules={{
                                   required: {value: true, message: "Gebruikersnaam is verplicht"}
                               }} type="text" register={register} errors={errors}/>
                        <Input className="text-field-red form-field" inputId="email" name="email" labelName="Email"
                               validationRules={{
                                   required: {
                                       value: true,
                                       message: 'Email veld is verplicht',
                                   },
                                   validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                               }} type="email" register={register} errors={errors}/>

                        <Input className="text-field-red form-field" inputId="password" name="password" labelName="Wachtwoord" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}
                        }} type="password" register={register} errors={errors}/>

                        <fieldset>
                            <legend>Soort gebruiker</legend>
                            <div className="role-field">
                        <Input className="radio-input" inputId="haker" name="role" labelName="Haker" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}}} type="radio" value="HAKER" checked="defaultChecked" register={register} errors={errors}/>
                        <Input className="radio-input" inputId="patroonmaker" name="role" labelName="Patroonmaker" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}}} type="radio" value="PATROONMAKER" register={register} errors={errors}/>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div className="buttons">

                    <Button classname="text-button yellow" type="button" text="Inloggen?"/>

                    <Button classname="text-button orange" type="submit" text="Aanmaken"/>
                </div>

            </form>
        </section>

    </main>


}

export default SignUp;