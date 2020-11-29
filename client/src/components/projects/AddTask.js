import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";
 
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./AddTask.css"

class AddTask extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            name: '',
            start: new Date(),
            end: new Date(),
            percentComplete: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("everything in props", this.props);
        this.props.addInfo(this.state);
        this.setState({ userID: this.state.userID, name: '', start: new Date(), end: new Date(), percentComplete: ''});
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
            <form onSubmit={this.onSubmit} style={{ display: 'flex', flexDirection: 'row', height: '40px'}}>
                <input 
                type="text"
                name="name"
                placeholder="Add New Task ..."
                style={{ flex: '5', padding: '5px'}}
                value={this.state.name}
                onChange={this.onChange}
                />
                <div className="customDatePickerWidth">
                <DatePicker
                selected={ this.state.start }
                onChange={ this.handleStartDateChange }
                style={{ flex: '3', padding: '5px', height: '40px'}}
                name="startDate"
                dateFormat="MM/dd/yyyy"
                />    
                </div>

                <DatePicker
                selected={ this.state.end }
                onChange={ this.handleEndDateChange }
                style={{ flex: '3', padding: '5px', height: 'inherit'}}
                name="endDate"
                dateFormat="MM/dd/yyyy"
                />
                <input 
                type="text"
                name="percentComplete"
                placeholder="Percent Completed"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.percentComplete}
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

export default withCookies(AddTask);