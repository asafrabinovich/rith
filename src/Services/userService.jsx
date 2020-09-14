import httpService from "./httpService";
import {apiUrl} from "../config.json";
import {getJwt} from "./authService";
import _ from 'lodash';


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
        "userName": user.name,
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

export function getUserDetails() {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const UserDetails = httpService.get(apiUrl + "/getUserDetails", config);
    return UserDetails;
}

export function editUserDetails(name, email) {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const editDetailsAffirmation = httpService.post(
        apiUrl + "/editDetails",
        {
            'email': email,
            'userName': name,
        }
        , config)
    return editDetailsAffirmation;
}

export function getUserReviews() {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const result = httpService.get(apiUrl + "/reviews", config);

    return result;
}