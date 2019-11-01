import React, {Component} from 'react';
import './App.css';
import {UploadButton} from "./UploadButton/UploadButton"
import axios from 'axios'
import {BASE_URL} from '../constants'
import {Button, Container, Navbar} from "react-bootstrap";
import RecordContainer from "./RecordContainer/RecordContainer";
import Modal from "react-bootstrap/Modal";
import {Record} from "./Record/Record";
import {RecordCreator} from "./RecordCreator/RecordCreator";

export class App extends Component{

    constructor(props){
        super(props);
        axios.defaults.baseURL = BASE_URL;
        this.state = {
            modalSave: false
        }
    }

    showModal = () => {
        this.setState({modalSave: true});
    };


    render() {
        return (
            <>
                <Container fluid>
                    <Navbar className='shadow-sm' bg='light'>
                        <Navbar.Brand><h3>Черные списки</h3></Navbar.Brand>
                        <Navbar.Collapse className='justify-content-end'>
                            <RecordCreator show={this.state.modalSave}/>
                            <UploadButton className='m-2'/>
                        </Navbar.Collapse>
                    </Navbar>
                    <RecordContainer/>
                </Container>
            </>
        );
    }
}

export default App;
