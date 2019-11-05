import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import {Alert, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {saveRecord} from "../../services/ApiService";

export class RecordCreator extends Component{

    constructor(props){
        super(props);
        this.initializeEmptyRecord();
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
                <Modal.Body>
                    {this.state.error &&
                    <Alert className='ml-3' variant='danger'>{this.state.errorMessage}</Alert> }
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Фамилия'
                                          ref={ref => this.record.surname = ref}
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder='Имя'
                                          ref={ref => this.record.firstName = ref}
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder='Отчество'
                                          ref={ref => this.record.secondName = ref}
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder='Дата рождения'
                                          ref={ref => this.record.birthDate = ref}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col sm={3}>
                            <Form.Control placeholder='Серия пасспорта'
                                          ref={ref => this.record.passportSeria = ref}
                            />
                        </Col>
                        <Col sm={3}>
                            <Form.Control placeholder='Номер пасспорта'
                                          ref={ref => this.record.passportNumber = ref}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='ИНН'
                                          ref={ref => this.record.inn = ref}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Телефон'
                                          ref={ref => this.record.phone = ref}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Почта'
                                          ref={ref => this.record.email = ref}
                            />
                        </Col>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveRecord}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
        );
    }

    saveRecord = () => {
        let clearRecord = {};
        for(let field in this.record){
            if(this.record[field].value !== '')
                clearRecord[field] = this.record[field].value;
        }
        saveRecord(clearRecord)
            .then(
                response => {
                    this.onHide();
                }).catch(
                    reason => {
                        let msg = reason.response.data.message;
                        this.setState({error: true, errorMessage: msg})
                    }
        );
    };

    onHide = () => {
        this.initializeEmptyRecord();
        this.setState({show: false, error: false, message: ''})
    };

    initializeEmptyRecord(){
        this.record = {
            surname: null,
            firstName: null,
            secondName: null,
            birthDate: null,
            passportSeria: null,
            passportNumber: null,
            inn: null,
            phone: null,
            email: null
        };
    }

}