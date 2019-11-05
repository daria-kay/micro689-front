import React, {Component} from "react";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class PersonalInfo extends Component {

    constructor(props){
        super(props);
        let isActive = typeof (this.props.info) !== "undefined";
        this.state  = {
            surname: isActive ? this.props.info.surname : '',
            firstName: isActive ? this.props.info.firstName : '',
            secondName: isActive ? this.props.info.secondName : '',
            birthDate: isActive ? this.props.info.birthDate : ''
        }
    }


    render() {
        let dis = typeof this.state.surname === 'undefined';
        return (
            <Form className='p-3'>
                <Row>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Фамилия</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.surname}
                                      onChange={(e) => this.update('surname', e.target.value)}
                        />
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Имя</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.firstName}
                                      onChange={(e) => this.update('firstName',  e.target.value)}
                        />
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Отчество</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.secondName}
                                      onChange={(e) => this.update('secondName', e.target.value)}
                        />
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Дата рождения</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.birthDate}
                                      onChange={(e) => this.update('birthDate', e.target.value)}
                        />
                    </Col>
                </Row>
            </Form>
        );
    }

    update = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        this.props.update(name, value, 'personal-info');
    }
}