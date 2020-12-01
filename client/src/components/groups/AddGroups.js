import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";

class AddGroups extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            name: '',
            error: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        fetch("/addGroup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        }).then(response => {
            if(response.status !== 200) {
                response.text().then(data => {
                    this.setState({ error: data });
                })
            } else {
                window.location.reload();
            }
        });

        this.setState({name: ''});
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <h3 className="text-danger">{this.state.error}</h3>
                <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Group name..."
                        style={{ flex: '5', padding: '5px'}}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn"
                        style={{flex: '1', background: 'lightgrey'}}
                    />
                </form>
            </div>
        )
    }
}

export default withCookies(AddGroups);