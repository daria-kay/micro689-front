import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import './style.css'
import {deleteRecord, saveRecord, updateRecord} from "../../services/ApiService";
import {PersonalInfo} from "../PersonalInfo/PersonalInfo";
import {PassportInfo} from "../PassportInfo/PassportInfo";
import {Inn} from "../Inn/Inn";
import {Phone} from "../Phone/Phone";
import {Email} from "../Email/Email";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class Record extends Component{

    constructor(props) {
        super(props);
        this.newValues = {};
        this.state = {
            saveDis: true
        }
    }

    render() {
        let record = this.props.record;
        return (
            <div className='shadow-sm m-2'>
            <Form.Row className='mb-n2'>
                <Col sm='5'>
                    <PersonalInfo info={record.personalInfo} update={this.getNewValue}/>
                </Col>
                <Col sm='3'>
                    <PassportInfo info={record.passportInfo} update={this.getNewValue}/>
                </Col>
                <Col sm='1'>
                    <Inn inn={record.inn} update={this.getNewValue} />
                </Col>
                <Col sm='1'>
                    <Phone phone={record.phone} update={this.getNewValue} />
                </Col>
                <Col sm='1'><Email email={record.email} update={this.getNewValue} /></Col>
            </Form.Row>
                <Row>
                    <Col sm='1'>
                        <Button disabled={this.state.saveDis}
                                variant='outline-success'
                                className='d-inline m-3'
                                onClick={this.saveChanges}>Сохранить</Button>
                    </Col>
                    <Col sm='1'>
                        <Button variant='outline-danger'
                                className='d-inline m-3'
                                onClick={this.deleteRecord}>Удалить</Button>
                    </Col>
                </Row>
        </div>

        );
    }

    saveChanges = (e) => {
        for (let block in this.newValues){
            updateRecord(this.props.record.id, block, this.newValues[block])
                .then( response => {
                        this.setState({saveDis: true});
                        this.props.updateList();
                    }
                )
                .finally( () =>
                    this.newValues[block] = {}

                );
        }
    };

    getNewValue = (name, value, block) => {
        let blockUpdates = {};
        blockUpdates[name] = value;
        this.newValues[block] = blockUpdates;
        this.setState({saveDis: false})
    };

    deleteRecord = (e) => {
        deleteRecord(this.props.record.id)
            .then(response => {
                this.props.updateList();
            })
    };
}