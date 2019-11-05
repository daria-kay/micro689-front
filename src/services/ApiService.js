import axios from 'axios';
import {Base64} from 'js-base64';

let authToken = () => localStorage.getItem('BA');

export function uploadFile(file) {
    let formData = new FormData();
    formData.append("csv", file);

    return axios.post('black-list/upload-task',
        formData, {
            headers: {
                'Content-Type':'multipart/form-data',
                "Authorization": authToken() }
        });
}

export function getNextRecords(count, page) {
    return axios.get("/black-list?size="+count+"&page="+page, {
        headers: {
            "Authorization": authToken()
        }});
}

export function updateRecord(id, block, newValues) {
    return axios.put("/black-list/"+block + "/"+id, newValues,{
        headers: {
            "Authorization": authToken()
        }});
}

export function deleteRecord(id) {
    return axios.delete("/black-list/"+id,{
        headers: {
            "Authorization": authToken()
        }});

}

export function saveRecord(record) {
    return axios.post("black-list/add-entry-task", record, {
        headers: {
            "Authorization": authToken()
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
    }).then(response => {
        window.localStorage.setItem('BA', auth);
    });
}

export function search(record) {
    return axios.post("black-list/find-records-task", record, {
        headers: {
            "Authorization": authToken()
        }});
}

export function isAuthenticate() {
    return axios.get('/login', {
        headers: {
            "Authorization": authToken()
        }
    });
}

