import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const loginAdmin = (jwt: string) => {
    Cookies.set('jwt', jwt, {
        secure: true,
        sameSite: 'strict'
    });
}

export const logoutAdmin = () => {
    Cookies.remove('jwt');
    //setUserData: any
    //setUserData(null);
}

export const readAdmin = () => {
    const jwt = Cookies.get('jwt');
    if (jwt != null) {
        var decoded = jwt_decode(jwt);
        return decoded;
    } else {
        return null
    }
}

export const readAdminJwt = () => {
    return Cookies.get('jwt');
}

export const checkAdmin = () => {
    return Cookies.get('jwt') != null;
}