import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

export class Phone extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        let isActive = typeof (this.props.phone) !== "undefined";
        this.state = {
            phone : isActive ? this.props.phone : '',
            disabled: !isActive
        }

    }

    render() {

        return (
            <Form.Row className='p-3'>
                <Form.Label className='text-center font-weight-bold'>Телефон</Form.Label>
                <Form.Control disabled={this.state.disabled}
                              plaintext
                              defaultValue={this.state.phone}
                              onChange={(e) => this.validateAndUpdate('phone', e.target.value)}
                />
            </Form.Row>
        );
    }

    validateAndUpdate = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        this.props.update(name, value, 'phone');
    }
}