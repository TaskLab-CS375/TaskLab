import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";

class GetGroups extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            groups: '',
            error: ''
        };
    }

    get_group() {
        fetch("/getGroups", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        }).then(response => {
            if(response.status !== 200) {
                response.text().then(data => {
                    this.setState({ error: data });
                });
            } else {
                response.json().then(data => {
                    this.setState({ groups: data });
                });
            }
        });
    }

    componentDidMount() {
        this.get_group();
    }

    render() {
        return (
            <div>
                <h3 className="text-danger">{this.state.error}</h3>
                <ul>
                    {this.state.groups && this.state.groups.rows.map((group) =>
                        <li>{group.groupname}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default withCookies(GetGroups);