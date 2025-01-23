import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
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

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>even wacht a.u.b.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
