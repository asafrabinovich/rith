import axios from 'axios';
import logService from "./logService";
import {getJwt} from "./authService";
import {apiUrl} from "../config";


axios.interceptors.response.use(null,error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status <500;

    if(!expectedError){
        logService.log("logging the error", error);
        alert("An unexcepted error uccord")
    }

    return Promise.reject(error);
})

export function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export async function uploadFile(file) {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + getJwt()
        }
    }
    let formData = new FormData();
    formData.append("file", file);

    const NewFile = await axios.post(apiUrl + "/uploadFile", formData, config);
    return NewFile.data.url;
}

// export function getFileURL(fileName) {
//     return apiUrl + "/getFile?name=" + fileName;
// }

// export async function uploadFile(file) {
//     let config = {
//         headers: {
//             'Authorization': 'Bearer ' + getJwt()
//         }
//     }
//     let formData = new FormData();
//     formData.append("file", file);
//     const NewFile = await axios.post(apiUrl + "/uploadSensitiveFile", formData, config);
//     return NewFile.data.filename;
// }

export async function sendContactForm(data) {
    console.log("Json Before Sending: ", data)
    await axios.post(apiUrl + "/contact", data);
}

// export function getImage(imageName) {
//
//     return apiUrl + "/getFile?name=" + imageName;
// }

export async function getUploaderName(userID) {
    const res = await axios.post(apiUrl + "/getUserNameById", {'id': userID});
    return res.data.userName
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
    sendContactForm,
    getUploaderName

}