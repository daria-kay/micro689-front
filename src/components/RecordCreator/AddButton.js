import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {saveRecord} from "../../services/ApiService";
import {RecordForm} from "../RecordForm/RecordForm";

export class AddButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            show: false,
            error: false,
            errorMessage: ''
        }
    }

    render() {
        return(
            <>
            <Button className='m-2'
                    onClick={(e) => this.setState({show: true})}>
                Добавить запись</Button>
            <Modal dialogClassName='modal-90w'
                   show={this.state.show}
                   onHide={this.onHide}
                   size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление записи</Modal.Title>
                </Modal.Header>
                <RecordForm error={this.state.error}
                            msg={this.state.errorMessage}
                            name={'Сохранить'}
                            doAction={this.doAction}
                />
            </Modal>
        </>
        );
    }

    doAction = (record) => {
        saveRecord(record)
            .then(
                response => {
                    this.onHide();
                    this.props.update();
                }).catch(
                    reason => {
                        let msg = reason.response.data.message;
                        this.setState({error: true, errorMessage: msg})
                    }
        );
    };

    onHide = () => {
        this.setState({show: false, error: false, message: ''})
    };
}