import React, {Component} from 'react';
import './style.css';
import {getNextRecords} from "../../services/ApiService";
import {Record} from "../Record/Record";
import Button from "react-bootstrap/Button";

export default class RecordContainer extends Component {

    constructor(props){
        super(props);
        this.pageCount = 0;
        this.size = 10;
        this.state = {
            records: [],
            message: "Записей нет..."
        }
    }

    componentDidMount() {
        this.loadMoreRecords();
    }

    render() {
        return (
            <div className='mb-3'>
                {this.state.records.map(record =>
                    <Record key={record.id} record={record} updateList={this.updateRecordsList}/>)
                }
                <Button variant='success' onClick={this.loadMoreRecords}>Загрузить еще</Button>
            </div>
        );
    }

    loadMoreRecords = () => {
        getNextRecords(this.size, this.pageCount)
            .then(
                response => {
                    if(response.status === 200){
                        let newRecords = [];
                        newRecords = newRecords.concat(this.state.records);
                        newRecords = newRecords.concat(response.data);
                        this.setState({records: newRecords})
                    }
                }
            );
        this.pageCount += 1;
    };

    updateRecordsList = () => {
        getNextRecords(this.size*this.pageCount, 0)
            .then(
                response => {
                    if(response.status === 200){
                        let newRecords = [];
                        newRecords = newRecords.concat(this.state.records);
                        newRecords = newRecords.concat(response.data);
                        console.log(newRecords);
                        this.setState({records: newRecords})
                    }
                }
            );
    }


}
