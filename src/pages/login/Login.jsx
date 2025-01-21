import "./Login.css";
import Button from "../../components/button/Button.jsx";
import closeIcon from "../../assets/icons/close icon.svg";
import userIcon from "../../assets/icons/User Circle Single.svg";
import Input from "../../components/input/Input.jsx";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function Login(){
    const {register, formState: {errors}} = useForm();



    return <main>
        <h1>Login </h1>
        <section>
            <div className="login-container">
                <Button classname="icon-button" type="button" img={closeIcon} alt="Sluit icoon"/>
                <Button classname="user-icon" type="button" img={userIcon} alt="Profiel icoon" />
                <form>
                    <div>
                    <Input className="text-field-red" inputId="username" labelName="Gebruikersnaam" validationRules={{
                        required: {value: true, message: "Gebruikersnaam is verplicht"},
                    }} type="text" register={register} errors={errors}/>

                    <Input className="text-field-red" inputId="password" labelName="Wachtwoord" validationRules={{
                        required: {value: true, message: "Wachtwoord is verplicht"},
                    }} type="text" register={register} errors={errors}/>
                    <Link to={"/"}>Wachtwoord vergeten?</Link>
                    </div>

                    <Button classname="text-button yellow" type="button" text="Account aanmaken?"/>

                    <Button classname="text-button orange" type="submit" text="Inloggen"/>

                </form>
            </div>

        </section>

    </main>
}

export default Login;