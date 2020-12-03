import React, { Component } from 'react'
import './FormTable.css';
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
            <form onSubmit={this.onSubmit}>
                <table id="form-table" style={{display: 'block'}}>
                    <tr>
                        <td id="project-name">
                            Project Name: 
                            <input 
                            type="text"
                            name="name"
                            style={{ width:'100%', height: '30px', padding: '5px'}}
                            value={this.state.name}
                            onChange={this.onChange}
                            />
                        </td>
                        <td id="group-name">
                            Group Name:
                            <input 
                            type="text"
                            name="group"
                            style={{ width:'100%', height: '30px', padding: '5px'}}
                            value={this.state.group}
                            onChange={this.onChange}
                            />
                        </td>
                        <td>
                            Start Date: 
                            <div className="customDatePickerWidth">
                            <DatePicker
                            selected={ this.state.start }
                            onChange={ this.handleStartDateChange }
                            style={{ padding: '5px', width:'100%', height: '100%'}}
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                            />
                            </div>
                        </td>
                        <td>
                            End Date: 
                            <div className="customDatePickerWidth">
                            <DatePicker
                            selected={ this.state.end }
                            onChange={ this.handleEndDateChange }
                            style={{ padding: '5px', width:'100%', height: '100%'}}
                            name="endDate"
                            dateFormat="MM/dd/yyyy"
                            />
                            </div>
                        </td>
                        <td>
                            Status: 
                            <input 
                            type="text"
                            name="status"
                            style={{ width:'100%', height: '30px', padding: '5px'}}
                            value={this.state.status}
                            onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <br />
                            <input
                            type="submit"
                            value="Submit"
                            className="btn"
                            style={{background: 'lightgrey', width:'100%', height: '100%'}}
                            />
                        </td>
                    </tr>
                </table>
            </form>
        )
    }
}

export default withCookies(AddProject);