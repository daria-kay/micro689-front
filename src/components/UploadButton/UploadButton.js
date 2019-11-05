import React, {Component} from "react";
import "./style.css"
import {uploadFile} from "../../services/ApiService";

export class UploadButton extends Component{

    render() {
        return (
            <>
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
            </>
        );
    }

    uploader = (event) => {
        uploadFile(event.target.files[0])
            .then( response =>{
               this.props.onUpload(true, 'Записи добавлены')}
            )
            .catch( reason => {
                    let msg = reason.response.data.message;
                    this.props.onUpload(false, msg === '' ? 'Произошла ошибка' : msg)
                }
            );
    };
}

