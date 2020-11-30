import React, { Component } from 'react'
import {withCookies} from "react-cookie";
 
import DatePicker from 'react-datepicker';
 
// import "react-datepicker/dist/react-datepicker.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

import "./FormTable.css"

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
            <form onSubmit={this.onSubmit}>
                <table id="form-table" style={{display: 'block'}}>
                    <tr>
                        <td id="task-name">
                            Task Name: 
                            <input 
                            type="text"
                            name="name"
                            style={{ width:'100%', height: '30px', padding: '5px'}}
                            value={this.state.name}
                            onChange={this.onChange}
                            /> </td>
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
                            Percent Completed: 
                            <input 
                            type="text"
                            name="percentComplete"
                            style={{padding: '5px', width:'100%', height: '30px'}}
                            value={this.state.percentComplete}
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

export default withCookies(AddTask);