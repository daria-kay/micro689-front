import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

export class Email extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        let isActive = typeof (this.props.email) !== "undefined";
        this.state = {
            email : isActive ? this.props.email : ''
        }
    }

    render() {
        return (
            <Form.Row className='p-3'>
                <Form.Label className='text-center font-weight-bold'>Почта</Form.Label>
                <Form.Control plaintext
                              defaultValue={this.state.email}
                              onChange={(e) => this.validateAndUpdate('email', e.target.value)}
                />
                {this.validator.message('email', this.state.email,
                    'email')}
            </Form.Row>
        );
    }

    validateAndUpdate = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        if(this.validator.fieldValid(name)){
            this.props.update(name, value, 'email');
        }
    }
}