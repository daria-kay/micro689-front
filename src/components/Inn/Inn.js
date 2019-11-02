import React, {Component} from "react";
import {Form} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

export class Inn extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
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
                              onChange={(e) => this.validateAndUpdate('inn', e.target.value)}
                />
                {this.validator.message('inn', this.state.inn,
                    'numeric|size:10')}
            </Form.Row>
        );
    }

    validateAndUpdate = (name, value) => {
        let newState = {};
        newState[name] = value;
        this.setState(newState);
        if(this.validator.fieldValid(name)){
            this.props.update(name, value, 'inn ');
        }
    }
}