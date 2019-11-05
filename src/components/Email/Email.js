import React, {Component} from "react";
import {Form} from "react-bootstrap";

export class Email extends Component {

    constructor(props){
        super(props);
        let isActive = typeof (this.props.email) !== "undefined";
        this.state = {
            email : isActive ? this.props.email : '',
            disabled: !isActive
        }
    }

    render() {
        return (
            <Form.Row className='p-3'>
                <Form.Label className='text-center font-weight-bold'>Почта</Form.Label>
                <Form.Control disabled={this.state.disabled} plaintext
                              defaultValue={this.state.email}
                              onChange={(e) => this.update('email', e.target.value)}
                />
            </Form.Row>
        );
    }

    update = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        this.props.update(name, value, 'email');

    }
}