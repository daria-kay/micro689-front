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
               this.props.onUpload(true, 'Записи добавлены');
               this.props.update();
            }
            )
            .catch( reason => {
                    let msg = this.getMessage(reason.response);
                    this.props.onUpload(false, msg === '' ? 'Произошла ошибка' : msg)
                }
            );
    };

    getMessage = (response) => {
        if(typeof response.data.message === 'undefined' ||
            response.data.message === '' || response.status === 500){
            return 'Ошибка загрузки файла'
        }
        return response.data.message;
    }
}

