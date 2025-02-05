import "./Login.css";
import Button from "../../components/button/Button.jsx";
import profilePicture from "../../assets/icons/User Circle blue.svg";
import InputText from "../../components/input-text/InputText.jsx";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContect.jsx";

function Login(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login, error} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLoginSubmit(data) {
        try {
            const result = await axios.post("http://localhost:8080/login",
                {
                    userName: data.username,
                    password: data.password,

                });
            login(result.headers.authorization);

        } catch (e){
            console.error("er ging wat fout " + e);
        }
    }

    return <main>
        <section className="login-section">

                <form onSubmit={handleSubmit(handleLoginSubmit)} className="login-form">
                    <div className="upper-part">
                    <img src={profilePicture} alt="Profiel foto"/>
                    <div className="fields">
                        <InputText className="text-field-red form-field" inputId="username" name="username" labelName="Gebruikersnaam"
                                   validationRules={{
                                   required: {value: true, message: "Gebruikersnaam is verplicht"}
                               }} type="text" register={register} errors={errors}/>

                        <InputText className="text-field-red form-field" inputId="password" name="password" labelName="Wachtwoord" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}
                        }} type="password" register={register} errors={errors}/>

                    </div>
                    <Link className="reset-password" to={"/sign-up"}>Wachtwoord vergeten?</Link>
                    </div>
                    {error && <p className="error-message">{errors}</p>}

                    <div className="buttons">

                        <Button classname="text-button yellow" type="button" onClick={() => {navigate("/sign-up")}} text="Account aanmaken?"/>

                        <Button classname="text-button orange" type="submit" text="Inloggen"/>
                    </div>

                </form>

        </section>

    </main>
}

export default Login;