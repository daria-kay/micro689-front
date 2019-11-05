import axios from 'axios';
import {Base64} from 'js-base64';

let authHeader = "";

export function uploadFile(file) {
    let formData = new FormData();
    formData.append("csv", file);

    return axios.post('black-list/upload-task',
        formData, {
            headers: {
                'Content-Type':'multipart/form-data',
                "Authorization": authHeader}
        });
}

export function getNextRecords(count, page) {
    return axios.get("/black-list?size="+count+"&page="+page, {
        headers: {
            "Authorization": authHeader
        }});
}

export function updateRecord(id, block, newValues) {
    return axios.put("/black-list/"+block + "/"+id, newValues,{
        headers: {
            "Authorization": authHeader
        }});
}

export function deleteRecord(id) {
    return axios.delete("/black-list/"+id,{
        headers: {
            "Authorization": authHeader
        }});

}

export function saveRecord(record) {
    return axios.post("black-list/add-entry-task", record, {
        headers: {
            "Authorization": authHeader
        }});
}

export function getPartners() {
    return axios.get("/partner");
}

export function logup(request) {
    return axios.post("/logup", request);
}

export function login(login, password) {
    let auth = "Basic " + Base64.encode(login + ":"+password);
    return axios.get("/login", {
        headers: {
            "Authorization": auth
        }
    }).then(
        response => {
            authHeader = auth;
        }
    )
}

export function isAuthenticate() {
    return axios.get('/login', {
        headers: {
            "Authorization": authHeader
        }
    });
}

