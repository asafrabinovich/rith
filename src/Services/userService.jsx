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

    const UserDetails = httpService.get(apiUrl + "/getUserDetails", config);
    console.log(UserDetails);
    return UserDetails;
}

export async function getUserReviews() {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }

    const UserReviews = await httpService.get(apiUrl + "/reviews", config);
    return UserReviews.data;
}

export function getUserReviews2() {

}