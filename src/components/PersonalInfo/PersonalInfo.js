import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class PersonalInfo extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        let isActive = typeof (this.props.info) !== "undefined";
        this.state  = {
            surname: isActive ? this.props.info.surname : '',
            firstName: isActive ? this.props.info.firstName : '',
            secondName: isActive ? this.props.info.secondName : '',
            birthDate: isActive ? this.props.info.birthDate : '',
        }
    }


    render() {


        return (
            <Form className='p-3'>
                <Row>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Фамилия</Form.Label>
                        <Form.Control plaintext
                                      defaultValue={this.state.surname}
                                      onChange={(e) => this.validateAndUpdate('surname', e.target.value)}
                        />
                        {this.validator.message('surname',
                            this.state.surname, 'alpha|max:100')}
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Имя</Form.Label>
                        <Form.Control plaintext
                                      defaultValue={this.state.firstName}
                                      onChange={(e) => this.validateAndUpdate('firstName',  e.target.value)}
                        />
                        {this.validator.message('firstName',
                            this.state.firstName, 'alpha|max:100')}
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Отчество</Form.Label>
                        <Form.Control plaintext
                                      defaultValue={this.state.secondName}
                                      onChange={(e) => this.validateAndUpdate('secondName', e.target.value)}
                        />
                        {this.validator.message('secondName',
                            this.state.secondName, 'alpha|max:100')}
                    </Col>
                    <Col sm='3'>
                        <Form.Label className='font-weight-bold'>Дата рождения</Form.Label>
                        <Form.Control plaintext
                                      defaultValue={this.state.birthDate}
                                      onChange={(e) => this.validateAndUpdate('birthDate', e.target.value)}
                        />
                        {this.validator.message('birthDate', this.state.birthDate,
                            'regex:^[0-9]{}-[0-9]{2}-[0-9]{2}$')}
                    </Col>
                </Row>
            </Form>
        );
    }

    validateAndUpdate = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        if(this.validator.fieldValid(name)){
            this.props.update(name, value, 'personal-info');
        }
    }
}