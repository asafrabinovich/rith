import httpService from "./httpService";
import {apiUrl} from "../config.json"

const apiEndpoint = apiUrl + "/register";

// export function register(user) {
//     return httpService.post(apiEndpoint, {
//         email: user.username,
//         password : user.password,
//         // name :user.name
//     })
// }
export function register(user) {
    return httpService.post(apiEndpoint, {
        "email": user.username,
        "password": user.password,
        "firstName": user.name,
        "lastName": user.name
    })
}

// export function getUserFirstName(userId) {
//     return httpService.get(apiUrl + "/getUserDetails", {
//         "email": user.username,
//         "password" : user.password,
//         "firstName" :user.name,
//         "lastName" :user.name
//     })
// }