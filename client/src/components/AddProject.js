import React, { Component } from 'react'
import './Project.css';
import {withCookies} from "react-cookie";

class AddProject extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            name: '',
            group: '',
            start: '',
            end: '',
            status: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addProject(this.state);
        this.setState({ userID: this.state.userID, name: '', group: '', start: '', end: '', status: ''});
    }

    onChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input 
                type="text"
                name="name"
                placeholder="Add New Project ..."
                style={{ flex: '5', padding: '5px'}}
                value={this.state.name}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="group"
                placeholder="Group Name"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.group}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="start"
                placeholder="Start Time"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.start}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="end"
                placeholder="End Time"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.end}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="status"
                placeholder="Status"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.status}
                onChange={this.onChange}
                />
                <input
                type="submit"
                value="Submit"
                className="btn"
                style={{flex: '1', background: 'lightgrey'}}
                />
            </form>
        )
    }
}

export default withCookies(AddProject);