import "./Login.css";
import Button from "../../components/button/Button.jsx";
import profilePicture from "../../assets/icons/User Circle blue.svg";
import InputText from "../../components/input-text/InputText.jsx";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContect.jsx";

function Login() {
    const [loginError, setLoginError] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLoginSubmit(data) {
        setLoginError("");
        try {
            const result = await axios.post("http://localhost:8080/login",
                {
                    userName: data.username,
                    password: data.password,

                });
            login(result.headers.authorization);
            navigate("/");
        } catch (e) {
          setLoginError("Je gebruikersnaam of wachtwoord klopt niet");
        }
    }

    return <main>
        <section className="login-section">
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="login-form">
                <div className="upper-part">
                    <img src={profilePicture} alt="Profiel foto"/>
                    <div className="fields">
                        <InputText className="text-field-red form-field" inputId="username" name="username"
                                   labelName="Gebruikersnaam"
                                   validationRules={{
                                       required: {value: true, message: "Gebruikersnaam is verplicht"}
                                   }} type="text" register={register} errors={errors}/>

                        <InputText className="text-field-red form-field" inputId="password" name="password"
                                   labelName="Wachtwoord" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}
                        }} type="password" register={register} errors={errors}/>

                    </div>
                    <Link className="reset-password" to={"/sign-up"}>Wachtwoord vergeten?</Link>
                </div>
                {loginError && <p className="error-message">{loginError}</p>}

                <div className="buttons">

                    <Button classname="text-button yellow" type="button" onClick={() => {
                        navigate("/sign-up")
                    }} text="Account aanmaken?"/>

                    <Button classname="text-button orange" type="submit" text="Inloggen"/>
                </div>

            </form>

        </section>

    </main>
}

export default Login;