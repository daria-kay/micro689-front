import React, {Component} from "react";
import {Container, Navbar} from "react-bootstrap";
import {RecordCreator} from "../RecordCreator/RecordCreator";
import {UploadButton} from "../UploadButton/UploadButton";
import RecordContainer from "../RecordContainer/RecordContainer";
import {isAuthenticate} from "../../services/ApiService";

export class BlackList extends Component {

    componentDidMount() {
        isAuthenticate()
            .catch(reason => {
                this.props.history.push('/login')
            });
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Navbar className='shadow-sm' bg='light'>
                        <Navbar.Brand><h3>Черные списки</h3></Navbar.Brand>
                        <Navbar.Collapse className='justify-content-end'>
                            <RecordCreator />
                            <UploadButton className='m-2' />
                        </Navbar.Collapse>
                    </Navbar>
                    <RecordContainer />
                </Container>
            </>
        );
    }

}