import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const loginAdmin = (jwt: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);

    Cookies.set('jwt', jwt, {
        secure: true,
        sameSite: 'strict',
        expires: expirationDate
    });
}

export const logoutAdmin = () => {
    Cookies.remove('jwt');
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