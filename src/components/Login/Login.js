import React from 'react';
import {Button, Form} from 'react-bootstrap'
import md5 from 'js-md5'
import './style.css'
import {login} from "../../services/ApiService";
import Alert from "react-bootstrap/Alert";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: [],
            fail: false,
            message: null
        };
        this.loginInput = undefined;
        this.passwordInput = undefined;
    }

    login = () => {
        login(this.loginInput.value, md5(this.passwordInput.value))
            .then(res => {
                this.props.history.push("/")
            })
            .catch(reason => {
                this.setState({fail: true, message: this.getMessage(reason.response.data.message)})
            })
    };

    render() {
        return (
            <div className="login">
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
                    <Button variant="primary" onClick={this.login}>
                        Войти
                    </Button>
                    <a href="/logup">
                        Зарегистрироваться
                    </a>
                </Form>
            </div>
        )
    }

    getMessage = (message) => {
        return message === '' || typeof message === 'undefined' ? 'Неправильный пароль' : message
    }
}