import httpService from "./httpService";
import {apiUrl} from "../config.json"

const apiEndpoint = apiUrl + "/register";

export function register(user) {
    console.log(apiEndpoint);
    return httpService.post(apiEndpoint, {
        email: user.username,
        password : user.password,
        // name :user.name
    })
}

