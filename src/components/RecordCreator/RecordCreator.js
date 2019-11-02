import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import {Alert, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {saveRecord} from "../../services/ApiService";
import SimpleReactValidator from "simple-react-validator";

export class RecordCreator extends Component{

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
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
                   onHide={() => this.setState({show: false})}
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
                                          onChange={(e) => this.record['surname'] = e.target.value}/>
                            {this.validator.message('surname',
                                this.record.surname, 'max:30')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Имя'
                                          onChange={(e) => this.record['firstName'] = e.target.value}
                            />
                            {this.validator.message('firstName',
                                this.record.firstName, 'max:15')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Отчество'
                                          onChange={(e) => this.record['secondName'] = e.target.value}
                            />
                            {this.validator.message('secondName',
                                this.record.secondName, 'max:30')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Дата рождения'
                                          onChange={(e) => this.record['birthDate'] = e.target.value}
                            />
                            {this.validator.message('birthDate', this.record.birthDate,
                                'regex:^[0-9]{4}-[0-9]{2}-[0-9]{2}$')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col sm={3}>
                            <Form.Control placeholder='Серия пасспорта'
                                          onChange={(e)  => this.record['passportSeria'] = e.target.value}
                            />
                            {this.validator.message('passportSeria', this.record.passportSeria,
                                'numeric|size:4')}
                        </Col>
                        <Col sm={3}>
                            <Form.Control placeholder='Номер пасспорта'
                                          onChange={(e) => this.record['passportNumber'] = e.target.value}
                            />
                            {this.validator.message('passportNumber', this.record.passportNumber,
                                'numeric|size:6')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='ИНН'
                                          onChange={(e)  => this.record['inn'] = e.target.value}
                            />
                            {this.validator.message('inn', this.record.inn,
                                'numeric|size:10')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Телефон'
                                          onChange={(e) => this.record['phone'] = e.target.value}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Почта'
                                          onChange={(e) => this.record['email'] = e.target.value}
                            />
                            {this.validator.message('email', this.record.email,
                                'email')}
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
        this.setState({error: false});
        let clearRecord = {};
        for(let field in this.record){
            if(this.record[field] !== null)
                clearRecord[field] = this.record[field];
        }
        if(this.validator.allValid()){
            saveRecord(clearRecord)
                .then(
                    response => {
                        this.initializeEmptyRecord();
                        this.setState({show: false});
                    }
                ).catch(
                    reason => {
                        let msg = reason.response.data.message;
                        this.setState({error: true, errorMessage: msg, record: {}})
                    }
            )
        } else{
            let msg = 'Неправильно заполнены поля';
            this.setState({error: true, errorMessage: msg})
        }
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