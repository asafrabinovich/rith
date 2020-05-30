import axios from 'axios';
import logService from "./logService";


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
export function fakeUploadImage(files) {

    const tempImage = 'https://r-cf.bstatic.com/images/hotel/max1024x768/134/134194812.jpg';
    let result = [];
    files.forEach(file=> result = [...result,{name:file.name,url:tempImage, key:tempImage+file.name}]);
    return  result
}
export default {
    get : axios.get,
    post : axios.post,
    put: axios.put,
    delete : axios.delete,
    setJwt,
    fakeUploadImage
}