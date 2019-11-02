import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import {BASE_URL} from '../constants'
import {BrowserRouter} from "react-router-dom";
import Main from "./Main";

export class App extends Component{

    constructor(props){
        super(props);
        axios.defaults.baseURL = BASE_URL;
    };

    render() {
        return (
            <>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </>
        );
    }
}