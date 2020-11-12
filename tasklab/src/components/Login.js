import React, {Component} from 'react';
import './Form.css';
import {Link} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
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
                this.props.history.push('/');
            } else {
                throw new Error(res.error);
            }
        }).catch(err => {
            console.log(err);
            alert('Error logging in. Please try again.')
        })
    }

    render() {
        return (
            <div id="form-root">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 text-center">Login Below!</h1>
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
                    <Link className="text-center" to="/register">Create your account here!</Link>
                </form>
            </div>
        );
    }
}