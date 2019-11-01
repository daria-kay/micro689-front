import React from 'react';
import './App.css';
import {UploadButton} from "./UploadButton/UploadButton"
import axios from 'axios'
import {BASE_URL} from '../constants'
import {Container, Navbar} from "react-bootstrap";
import RecordContainer from "./RecordContainer/RecordContainer";

function App() {
    axios.defaults.baseURL = BASE_URL;
  return (
      <Container fluid>
          <Navbar className='shadow-sm' bg='light'>
              <Navbar.Brand><h3>Черные списки</h3></Navbar.Brand>
              <Navbar.Collapse className='justify-content-end'>
                  <UploadButton />
              </Navbar.Collapse>
          </Navbar>
          <RecordContainer>
          </RecordContainer>
      </Container>
  );
}

export default App;
