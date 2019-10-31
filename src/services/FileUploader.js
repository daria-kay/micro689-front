import axios from 'axios';
import {FILE_UPLOAD_URL as url} from "../constants";

function uploadFile(file) {
    let formData = new FormData();
    formData.append("csv", file);
    return axios.post(url,
        formData, {
            headers: {
                'Content-Type':'multipart/form-data',
                "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="}
        });
}

function isSuccess(nativeResponse) {
    return nativeResponse.status === 201;
}

export default uploadFile;