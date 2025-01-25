import "./Login.css";
import Button from "../../components/button/Button.jsx";
import profilePicture from "../../assets/icons/User Circle blue.svg";
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../../assets/context/AuthContect.jsx";

function Login(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);

    async function handleLoginSubmit(data) {
        try {
            const result = await axios.post("http://localhost:8080/login",
                {
                    userName: data.username,
                    password: data.password,

                });
            console.log("het resultaat ", result.headers.authorization);
            login(result.headers.authorization);

        } catch (e){
            console.log("er ging wat fout " + e);
        }
    }

    return <main>
        <section className="login-section">

                <form onSubmit={handleSubmit(handleLoginSubmit)} className="login-form">
                    <div className="upper-part">
                    <img src={profilePicture} alt="Profiel foto"/>
                    <div className="fields">
                        <Input className="text-field-red" inputId="username" labelName="Gebruikersnaam"
                               validationRules={{
                                   required: {value: true, message: "Gebruikersnaam is verplicht"}
                               }} type="text" register={register} errors={errors}/>

                        <Input className="text-field-red" inputId="password" labelName="Wachtwoord" validationRules={{
                            required: {value: true, message: "Wachtwoord is verplicht"}
                        }} type="password" register={register} errors={errors}/>

                    </div>
                    <Link className="reset-password" to={"/"}>Wachtwoord vergeten?</Link>
                    </div>

                    <div className="buttons">

                        <Button classname="text-button yellow" type="button" text="Account aanmaken?"/>

                        <Button classname="text-button orange" type="submit" text="Inloggen"/>
                    </div>

                </form>

        </section>

    </main>
}

export default Login;