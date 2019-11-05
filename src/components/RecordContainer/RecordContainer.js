import React, {Component} from 'react';
import './style.css';
import {Record} from "../Record/Record";
import Button from "react-bootstrap/Button";

export default class RecordContainer extends Component {

    render() {
        return (
            <div className='mb-5'>
                <div className='mb-3'>
                    {this.props.records.map(record =>
                        <Record key={record.id} record={record} updateList={this.props.update}/>)
                    }
                </div>
                {this.props.records.length === 0 && <div><p>Пока нет записей</p></div>}
                {!this.props.noMore &&
                <Button className='d-block ml-3'
                        variant='success'
                        onClick={this.props.loadMore}>Загрузить еще</Button>}
            </div>
        );
    }



}
