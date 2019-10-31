import React from 'react';
import './App.css';
import {UploadButton} from "./UploadButton/UploadButton"
import axios from 'axios'
import {BASE_URL} from '../constants'

function App() {
    axios.defaults.baseURL = BASE_URL;
  return (
      <div className='app'>
        <UploadButton/>
      </div>
  );
}

export default App;
