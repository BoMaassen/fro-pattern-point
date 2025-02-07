import {jwtDecode} from "jwt-decode";

function isTokenValid(token) {
    const decode = jwtDecode(token);
    const expiration = decode.exp
    const now = new Date().getTime() / 1000;

    if (now >= expiration) {
        localStorage.removeItem("token");
        return false;
    }

    return true;
}

export default isTokenValid;