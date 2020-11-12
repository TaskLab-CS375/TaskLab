import React, {Component} from 'react';
import './Form.css'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
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

        fetch('/api/register', {
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
            alert('Error registering. Please try again.')
        })
    }

    render() {
        return (
            <div id="form-root" className="text-center">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3">Register!</h1>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        className="form-control"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        className="form-control"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        className="form-control"
                        required
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
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        );
    }
}