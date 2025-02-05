import {jwtDecode} from "jwt-decode";

function isTokenValid(token) {
    const decode = jwtDecode(token);
    const expiration = decode.exp
    const now = new Date().getTime() / 1000;

    return now < expiration;
}

export default isTokenValid;