import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class AddProject extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            name: '',
            group: '',
            start: new Date(),
            end: new Date(),
            status: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("start Date", this.state.start);
        console.log("end Date", this.state.end);
        this.props.addProject(this.state);
        this.setState({ userID: this.state.userID, name: '', group: '', start: new Date(), end: new Date(), status: ''});
    }

    onChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleStartDateChange = (date) => {
        this.setState({
            start: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            end: date
        })
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
                <DatePicker
                selected={ this.state.start }
                onChange={ this.handleStartDateChange }
                style={{ flex: '3', padding: '5px'}}
                name="startDate"
                dateFormat="MM/dd/yyyy"
                />
                <DatePicker
                selected={ this.state.end }
                onChange={ this.handleEndDateChange }
                style={{ flex: '3', padding: '5px'}}
                name="endDate"
                dateFormat="MM/dd/yyyy"
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