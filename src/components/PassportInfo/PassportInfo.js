import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class PassportInfo extends Component {

    constructor(props){
        super(props);
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
                                      onChange={(e) => this.update('passportSeria', e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label className='font-weight-bold'>Номер паспорта</Form.Label>
                        <Form.Control disabled={dis} plaintext
                                      defaultValue={this.state.number}
                                      onChange={(e) => this.update({'passportNumber': e.target.value})}
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
        this.props.update(name, value, 'passport-info');
    }
}