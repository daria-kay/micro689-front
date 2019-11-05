import React, {Component} from "react";
import {Alert, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

export class RecordForm extends Component{
    constructor(props){
        super(props);
        this.initializeEmptyRecord();
    }

    render() {
        this.initializeEmptyRecord();
        return (
            <>
                <Modal.Body>
                {this.props.error &&
                <Alert className='ml-3' variant='danger'>{this.props.msg}</Alert> }
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
                    <Button onClick={this.onAction}>{this.props.name}</Button>
                </Modal.Footer>
            </>
        );
    }

    initializeEmptyRecord = () => {
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
    };

    onAction = () => {
        let clearRecord = {};
        for(let field in this.record){
            if(this.record[field].value !== '')
                clearRecord[field] = this.record[field].value;
        }
        this.props.doAction(clearRecord);
    }
}