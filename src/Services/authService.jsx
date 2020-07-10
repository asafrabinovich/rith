import httpService from "./httpService";
import {apiUrl} from "../config";
import jwtDecode from "jwt-decode";

// const apiEndpoint = apiUrl + "/auth";
const apiEndpoint = apiUrl;

const tokenKey = 'token';
httpService.setJwt(getJwt());
// export async function login(email,password) {
//     try {
//         const {data: jwt} = await httpService.post(apiEndpoint + '/login', {
//             email: email,
//             password : password
//         })
//         console.log(jwt);
//         localStorage.setItem(tokenKey, jwt);
//     }catch (e) {
//
//     }
//
// }

export async function login(email,password) {
    try {
        const {data: jwt} = await httpService.post(apiEndpoint + '/login', {
            "Email": email,
            "Password" : password
        })
        console.log(jwt);
        localStorage.setItem(tokenKey, jwt);
    }catch (e) {

    }

}
export async function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout(key) {
    localStorage.removeItem(key);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return  jwtDecode(jwt);
    }catch (e) {
        return null;
    }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export  function fakeLogin(email,password) {
    console.log("Fake Login Called")
}
export  function fakeLogout(key) {
    console.log("Fake Logout Called")
}
export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt,
    fakeLogin,
    fakeLogout
};