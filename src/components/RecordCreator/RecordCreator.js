import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import {Record} from "../Record/Record";
import {Alert, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {saveRecord} from "../../services/ApiService";
import SimpleReactValidator from "simple-react-validator";

export class RecordCreator extends Component{

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            show: false,
            error: false,
            errorMessage: '',
            surname: '',
            firstName: '',
            secondName: '',
            birthDate: '',
            passportSeria: '',
            passportNumber: '',
            inn: '',
            phone: '',
            email: '',
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
                                          onChange={(e) => this.setState({surname: e.target.value})}/>
                            {this.validator.message('surname',
                                this.state.surname, 'alpha|max:100')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Имя'
                                          onChange={(e) => this.setState({firstName: e.target.value})}
                            />
                            {this.validator.message('firstName',
                                this.state.firstName, 'alpha|max:100')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Отчество'
                                          onChange={(e) => this.setState({secondName: e.target.value})}
                            />
                            {this.validator.message('secondName',
                                this.state.secondName, 'alpha|max:100')}
                        </Col>
                        <Col>
                            <Form.Control placeholder='Дата рождения'
                                          onChange={(e) => this.setState({birthDate: e.target.value})}
                            />
                            {this.validator.message('birthDate', this.state.birthDate,
                                'regex:^[0-9]{}-[0-9]{2}-[0-9]{2}$')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col sm={3}>
                            <Form.Control placeholder='Серия пасспорта'
                                          onChange={(e) => this.setState({passportSeria: e.target.value})}
                            />
                            {this.validator.message('passportSeria', this.state.passportSeria,
                                'numeric|size:4')}
                        </Col>
                        <Col sm={3}>
                            <Form.Control placeholder='Номер пасспорта'
                                          onChange={(e) => this.setState({passportNumber: e.target.value})}
                            />
                            {this.validator.message('passportNumber', this.state.passportNumber,
                                'numeric|size:6')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='ИНН'
                                          onChange={(e) => this.setState({inn: e.target.value})}
                            />
                            {this.validator.message('inn', this.state.inn,
                                'numeric|size:10')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Телефон'
                                          onChange={(e) => this.setState({phone: e.target.value})}
                            />
                            {this.validator.message('phone', this.state.phone,
                                'numeric|size:10')}
                        </Col>
                    </Form.Row>
                    <Form.Row className='m-3'>
                        <Col>
                            <Form.Control placeholder='Почта'
                                          onChange={(e) => this.setState({email: e.target.value})}
                            />
                            {this.validator.message('email', this.state.email,
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
        if(this.validator.allValid()){
            let record =  {
                personalInfo: {
                    surname: this.state.surname,
                    firstName: this.state.firstName,
                    secondName: this.state.secondName,
                    birthDate: this.state.birthDate,
                },
                passportInfo: {
                    passportSeria: this.state.passportSeria,
                    passportNumber: this.state.passportNumber,
                },
                inn: this.state.inn,
                phone: this.state.phone,
                email: this.state.email,
            };
            saveRecord(record)
                .then(
                    response => {
                        if(response.status === 201)
                            this.setState({show: false});
                        else {
                            let msg = response.data.errorMessage;
                            this.setState({error: true, errorMessage: msg})
                        }
                    }
                )
        } else{
            let msg = 'Неправильно заполнены поля';
            this.setState({error: true, errorMessage: msg})
        }
    };

}