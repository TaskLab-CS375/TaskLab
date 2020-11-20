import React, {Component} from 'react';
import '../Form.css';
import {Link} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                const { cookies } = this.props;
                cookies.set('userID', this.state.email, { path: '/' });

                this.props.history.push('/dashboard');
                window.location.reload();
            } else {
                res.text().then(message => {
                    this.setState({ error:message });
                });
            }
        }).catch(err => {
            err.text().then(errorMessage => {
                this.setState({ error:errorMessage });
            });
        })
    }

    render() {
        return (
            <div id="form-root" className="text-center">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3">Login Below!</h1>
                    <h4 className="text-danger">{this.state.error}</h4>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        className="form-control"
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        className="form-control"
                        required
                    />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                    <Link to="/register">Create your account here!</Link>
                </form>
            </div>
        );
    }
}

export default withCookies(Login);