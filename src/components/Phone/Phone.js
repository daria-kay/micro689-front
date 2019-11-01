import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

export class Phone extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        let isActive = typeof (this.props.phone) !== "undefined";
        this.state = {
            phone : isActive ? this.props.phone : ''
        }

    }

    render() {

        return (
            <Form.Row className='p-3'>
                <Form.Label className='text-center font-weight-bold'>Телефон</Form.Label>
                <Form.Control
                              plaintext
                              defaultValue={this.state.phone}
                              onChange={(e) => this.validateAndUpdate('phone', e.target.value)}
                />
                {this.validator.message('phone', this.state.phone,
                    'numeric|size:10')}
            </Form.Row>
        );
    }

    validateAndUpdate = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        if(this.validator.fieldValid(name)){
            this.props.update(name, value, 'phone');
        }
    }
}