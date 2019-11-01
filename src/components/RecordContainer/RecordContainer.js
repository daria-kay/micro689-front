import React, {Component} from 'react';
import './style.css';
import {getNextRecords} from "../../services/ApiService";
import {Record} from "../Record/Record";

export default class RecordContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            records: [],
            message: "Записей нет..."
        }
    }

    componentDidMount() {
          getNextRecords(3)
              .then(
                  response => {
                      if(response.status === 200){
                          this.setState({records: response.data})
                          console.log(response.data);
                      }
                  }
              );
    }

    render() {
        return (
            <div className='main-container'>
                {this.state.records.map(record =>
                    <Record key={record.id} record={record} updateList={this.updateRecordList}/>)}
            </div>
        );
    }

    updateRecordList = () => {
        getNextRecords(3)
            .then(
                response => {
                    if(response.status === 200){
                        this.setState({records: response.data})
                    }
                }
            );
    }
}
