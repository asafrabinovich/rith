import httpService from "./httpService";
import {apiUrl} from "../config.json";
import {getJwt} from "./authService";


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

export function getUserDetails() {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const UserDetails = httpService.get(apiUrl + "/getUserDetails",config);
    console.log(UserDetails);
    return UserDetails;
}

export function editUserDetails(name, email) {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const editDetailsAffirmation = httpService.get(apiUrl + "/editDetails",config, {
        "name" : name,
        "email": email
    });
    console.log(editDetailsAffirmation);
    return editDetailsAffirmation;
}

export function getUserReviews() {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    const UserReviews = httpService.get(apiUrl + "/reviews",config);
    console.log(UserReviews);
    return UserReviews;
}