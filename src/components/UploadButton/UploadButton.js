import React from "react";
import {Component} from 'react'
import "./style.css"
import uploadFile from "../../services/FileUploader";
import {Alert} from "react-bootstrap";

export class UploadButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            isUpload: false,
            message: "Просто тестовое сообщение",
            status: 'success'
        };
    }

    render() {
        let msgOpacity = this.state.isUpload ? '100' : '0';
        return (
            <div id='upload-btn-container'>
                    <div className='box' id='msg'>
                        <Alert style={{opacity: msgOpacity}}
                               variant={this.state.status}>
                            {this.state.message}
                        </Alert>
                    </div>
                        <div className='box' id='btn'>
                            <input type="file"
                                   name="csv"
                                   id="file"
                                   className="input-file"
                                   onChange={this.uploader}/>
                            <label htmlFor="file">Выбрать файл</label>
                        </div>
            </div>
        );
    }

    uploader = (event) => {
        uploadFile(event.target.files[0])
            .then(
                response =>
                    this.setState({
                        isUpload: true,
                        message: response.status === 201 ? "Файл успешно загружен" :
                            "Что-то пошло не так...",
                        status: response.status === 201 ? 'success' : 'danger'
                    })
            );
        setTimeout(() => this.setState({isUpload: false}), 2500);
    };
}

