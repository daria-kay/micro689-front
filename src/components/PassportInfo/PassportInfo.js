import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class PassportInfo extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        let isActive = typeof (this.props.info) !== "undefined";
        this.state = {
            seria: isActive ? this.props.info.passportSeria : '',
            number: isActive ? this.props.info.passportNumber : '',
        }
    }

    render() {
        let dis = typeof this.state.seria === 'undefined';
        return (
            <Form className='p-3'>
                <Row>
                    <Col>
                        <Form.Label className='font-weight-bold'>Серия паспорта</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.seria}
                                      onChange={(e) => this.validateAndUpdate('passportSeria', e.target.value)}
                        />
                        {this.validator.message('passportSeria', this.state.passportSeria,
                            'numeric|size:4')}
                    </Col>
                    <Col>
                        <Form.Label className='font-weight-bold'>Номер паспорта</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.number}
                                      onChange={(e) => this.validateAndUpdate({'passportNumber': e.target.value})}
                        />
                        {this.validator.message('passportNumber', this.state.passportNumber,
                            'numeric|size:6')}
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
            this.props.update(name, value, 'passport-info');
        }
    }
}