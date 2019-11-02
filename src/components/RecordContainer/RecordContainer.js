import React, {Component} from 'react';
import './style.css';
import {getNextRecords} from "../../services/ApiService";
import {Record} from "../Record/Record";
import Button from "react-bootstrap/Button";

export default class RecordContainer extends Component {

    constructor(props){
        super(props);
        this.pageCount = 1;
        this.size = 10;
        this.state = {
            records: [],
            loadMore: false
        };
    }

    render() {
        return (
            <div className='mb-5'>
                <div className='mb-3'>
                    {this.state.records.map(record =>
                        <Record key={record.id} record={record} updateList={this.updateRecordsList}/>)
                    }
                </div>
                {this.state.records.length !== 0 &&
                <Button className='d-block ml-3' variant='success' onClick={this.loadMoreRecords}>Загрузить еще</Button>}
            </div>
        );
    }

    loadMoreRecords = () => {
        getNextRecords(this.size, this.pageCount)
            .then(
                response => {
                        let newRecords = [];
                        newRecords = newRecords.concat(this.state.records);
                        newRecords = newRecords.concat(response.data);
                        this.setState({records: newRecords});
                        this.pageCount += 1;
                }
            );

    };

    updateRecordsList = () => {
        getNextRecords(this.size*this.pageCount, 0)
            .then(
                response => {
                        this.setState({records: response.data})
                }
            );
    }


}
