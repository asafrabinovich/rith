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
        "Email": user.username,
        "Password" : user.password,
        "First Name" :user.name,
        "Last Name" :user.name
    })
}

