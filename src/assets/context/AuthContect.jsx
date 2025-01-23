import {createContext, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const contextData ={
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logOut: logOut,
    }

    async function login(token){
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);

        try {
            const result = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            setAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,

                },
                status: 'done',
            });

        }catch (e){
            console.error(e + " Er is wat fout gegaan.")
        }
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");

    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>even wacht a.u.b.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
