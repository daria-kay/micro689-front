import React from 'react';
import './App.css';
import {UploadButton} from "./UploadButton/UploadButton"
import axios from 'axios'
import {BASE_URL} from '../constants'
import {Container, Jumbotron, Navbar} from "react-bootstrap";

function App() {
    axios.defaults.baseURL = BASE_URL;
  return (
      <Container fluid>
          <Navbar bg='light'>
              <Navbar.Brand><h3>Черные списки</h3></Navbar.Brand>
              <Navbar.Collapse className='justify-content-end'>
                  <UploadButton />
              </Navbar.Collapse>
          </Navbar>
      </Container>
  );
}

export default App;
