import React, {Component} from "react";
import {Container, Navbar} from "react-bootstrap";
import {RecordCreator} from "../RecordCreator/RecordCreator";
import {UploadButton} from "../UploadButton/UploadButton";
import RecordContainer from "../RecordContainer/RecordContainer";
import {isAuthenticate} from "../../services/ApiService";
import Popup from "../Popup/Popup";

export class BlackList extends Component {

    constructor(props){
        super(props);
        this.state = {
            successUpload: undefined,
            message: undefined,
            show: false
        }
    }

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
                            <UploadButton className='m-2' onUpload={this.showPopup}/>
                        </Navbar.Collapse>
                    </Navbar>
                    <RecordContainer />
                </Container>
                <Popup success={this.state.successUpload}
                       message={this.state.message}
                       update={this.state.show}/>
            </>
        );
    }

    showPopup = (isSuccess, msg) => {
        this.setState({successUpload: isSuccess, message: msg, show: true});
        setTimeout(() => this.setState({show: false}), 3000);
    }

}