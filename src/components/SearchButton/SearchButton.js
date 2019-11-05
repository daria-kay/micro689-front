import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {RecordForm} from "../RecordForm/RecordForm";
import {search} from "../../services/ApiService";

export class SearchButton extends Component{

    constructor(props) {
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
                        variant={this.props.variant}
                        onClick={(e) => this.setState({show: true})}>
                    Поиск</Button>
                <Modal dialogClassName='modal-90w'
                       show={this.state.show}
                       onHide={this.onHide}
                       size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Искать записи</Modal.Title>
                    </Modal.Header>
                    <RecordForm error={this.state.error}
                                msg={this.props.errorMessage}
                                name={'Искать'}
                                doAction={this.search}
                               />
                </Modal>
            </>
        );
    }

    search = (record) => {
        search(record)
            .then(response => {
                this.props.render(response.data);
                this.onHide();
            })
            .catch(reason => {
                let msg = reason.response.data.message;
                this.setState({error: true, errorMessage: msg})
            })

    };

    onHide = () => {
        this.setState({show: false, error: false, message: ''})
    };
}