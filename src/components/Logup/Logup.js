import React from 'react';
import {Button, Form} from 'react-bootstrap'
import md5 from 'js-md5'
import './style.css'
import {getPartners, logup} from "../../services/ApiService";
import Alert from "react-bootstrap/Alert";

export default class Logup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: [],
            fail: false,
            message: null
        };
        this.loginInput = undefined;
        this.passwordInput = undefined;
        this.partnerInput = undefined;
    }

    componentDidMount() {
        getPartners()
            .then(response => this.setState({partners: response.data}));
    }

    logup = () => {
        const logupRequest = {
            login: this.loginInput.value,
            passwordHash: md5(this.passwordInput.value),
            partnerId: this.partnerInput.value
        };
        logup(logupRequest)
            .then(response => {
                this.props.history.push("/login")
            }).catch(reason => {
            this.setState({fail: true, message: this.getMessage(reason.response.data.message)})
        })
    };

    render() {
        return (
            <div className="logup">
                <Form>
                    {this.state.fail && <Alert variant='danger'>{this.state.message}</Alert>}
                    <Form.Group controlId="loginInputGroup">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control ref={ref => this.loginInput = ref} type="text" maxLength={20} placeholder="Login" />
                    </Form.Group>
                    <Form.Group controlId="passwordInputGroup">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control ref={ref => this.passwordInput = ref} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="partnerInputGroup">
                        <Form.Label>Партнер</Form.Label>
                        <Form.Control ref={ref => this.partnerInput = ref} as="select">
                            {this.state.partners.map(item => <option key={`${item.id}`} value={item.id}>{item.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.logup}>
                        Зарегистрироваться
                    </Button>
                </Form>
            </div>
        )
    }

    getMessage = (message) => {
        return message === '' || typeof message === 'undefined' ? 'Что-то пошло не так...' : message
    }
}