import React from "react";
import {Component} from 'react'
import "./style.css"
import {uploadFile} from "../../services/ApiService";
import {Alert} from "react-bootstrap";

export class UploadButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            isUpload: false,
            status: 'success'
        };
    }

    render() {
        return (
            <div id='upload-btn-container'>
                        <div className='box' id='btn'>
                            <input type="file"
                                   name="csv"
                                   id="file"
                                   className="input-file"
                                   onChange={this.uploader}/>
                            <label htmlFor="file">Загрузить файл</label>
                        </div>
            </div>
        );
    }

    uploader = (event) => {
        uploadFile(event.target.files[0])
            .then(

            );
    };
}

