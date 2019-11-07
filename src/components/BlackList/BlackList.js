import React, {Component} from "react";
import {Container, Navbar} from "react-bootstrap";
import {AddButton} from "../RecordCreator/AddButton";
import {UploadButton} from "../UploadButton/UploadButton";
import RecordContainer from "../RecordContainer/RecordContainer";
import {getNextRecords} from "../../services/ApiService";
import Popup from "../Popup/Popup";
import Nav from "react-bootstrap/Nav";
import {SearchButton} from "../SearchButton/SearchButton";

export class BlackList extends Component {

    constructor(props){
        super(props);
        this.pageCount = 0;
        this.size = 10;
        this.state = {
            successUpload: undefined,
            message: undefined,
            shouldUpdate: false,
            noMore: true,
            records: [],
            isSort: false
        }
    }

    componentDidMount() {
        getNextRecords(this.size, this.pageCount)
            .then(response => {
                let len = response.data.length;
                if(len === 10)
                    this.pageCount +=1;
                this.setState({records: response.data, noMore: len < 10});
            })
            .catch(reason => {
                this.props.history.push('/login')
            });
    }

    render() {
        let searchVariant = this.state.isSort ? 'success' : 'outline-success';
        return (
            <>
                <Container fluid>
                    <Navbar className='shadow-sm' bg='light'>
                        <Navbar.Brand><h3>Черные списки</h3></Navbar.Brand>
                        <Nav>
                            <Nav.Link onClick={this.changeUser}>Сменить пользователя</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className='justify-content-end'>
                            <SearchButton render={this.renderRecords} variant={searchVariant}/>
                            <AddButton update={this.updateRecordsList}/>
                            <UploadButton className='m-2'
                                          onUpload={this.showPopup}
                                          update={this.updateRecordsList}/>
                        </Navbar.Collapse>
                    </Navbar>
                    <RecordContainer records={this.state.records}
                                     loadMore={this.loadMoreRecords}
                                     update={this.updateRecordsList}
                                    noMore={this.state.noMore}/>
                </Container>
                <Popup success={this.state.successUpload}
                       message={this.state.message}
                       update={this.state.shouldUpdate}/>
            </>
        );
    }

    showPopup = (isSuccess, msg) => {
        this.setState({successUpload: isSuccess, message: msg, shouldUpdate: true});
        setTimeout(() => this.setState({shouldUpdate: false}), 3000);
    };

    changeUser = () => {
        this.props.history.push('/login');
    };

    renderRecords = (records) => {
        this.setState({records: records, isSort: true, noMore: true});
    };

    loadMoreRecords = () => {
        getNextRecords(this.size, this.pageCount)
            .then(
                response => {
                    let newRecords = [];
                    newRecords = newRecords.concat(this.state.records);
                    newRecords = newRecords.concat(response.data);
                    this.setState({records: newRecords});
                    if(response.data.length === this.size) {
                        this.pageCount += 1;
                        this.setState({noMore: false})
                    } else {
                        this.setState({noMore: true});
                    }
                }
            );

    };

    updateRecordsList = () => {
        let size = this.pageCount === 0 ? 10 : this.size*this.pageCount;
        getNextRecords(size, 0)
            .then(
                response => {
                    this.setState({records: response.data, isSort: false})
                }
            );
    };

}