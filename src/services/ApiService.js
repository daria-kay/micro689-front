import axios from 'axios';
import {FILE_UPLOAD_URL as url} from "../constants";

export function uploadFile(file) {
    let formData = new FormData();
    formData.append("csv", file);
    return axios.post(url,
        formData, {
            headers: {
                'Content-Type':'multipart/form-data',
                "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="}
        });
}

export function getNextRecords(count, page) {
    return axios.get("?size="+count+"&page="+page, {
        headers: {
            "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="
        }});
}

export function updateRecord(id, block, newValues) {
    return axios.put("/"+block + "/"+id, newValues,{
        headers: {
            "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="
        }});
}

export function deleteRecord(id) {
    return axios.delete("/"+id,{
        headers: {
            "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="
        }});

}

export function saveRecord(record) {
    return axios.post("/save-record-task", record, {
        headers: {
            "Authorization": "Basic dGVzdF91c2VyOnRlc3RfcHc="
        }});
}

