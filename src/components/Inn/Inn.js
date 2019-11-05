import React, {Component} from "react";
import {Form} from "react-bootstrap";

export class Inn extends Component {

    constructor(props){
        super(props);
        let isActive = typeof (this.props.inn) !== "undefined";
        this.state = {
            inn: isActive ? this.props.inn : '',
            disabled: !isActive
        }
    }

    render() {
        return (
            <Form.Row className='p-3'>
                <Form.Label className='text-center font-weight-bold'>ИНН</Form.Label>
                <Form.Control  disabled={this.state.disabled} plaintext
                              defaultValue={this.state.inn}
                              onChange={(e) => this.update('inn', e.target.value)}
                />
            </Form.Row>
        );
    }

    update = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        this.props.update(name, value, 'inn');
    }
}