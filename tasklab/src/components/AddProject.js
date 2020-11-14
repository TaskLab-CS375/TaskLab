import React, { Component } from 'react'
import './Project.css';

export class AddProject extends Component {
    state = {
        projectName: '',
        startTime: '',
        endTime: '',
        projectStatus: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        // this.props.addTask(this.state);
        this.setState({ projectName: '', startTime: '', endTime: '', projectStatus: ''})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input 
                type="text"
                name="projectName"
                placeholder="Add New Project ..."
                style={{ flex: '5', padding: '5px'}}
                value={this.state.title}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="startTime"
                placeholder="Start Date"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.start}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="endTime"
                placeholder="Deadline"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.end}
                onChange={this.onChange}
                />
                <input 
                type="text"
                name="projectStatus"
                placeholder="status"
                style={{ flex: '3', padding: '5px'}}
                value={this.state.status}
                onChange={this.onChange}
                />
                <input
                type="submit"
                value="Submit"
                className="btn"
                style={{flex: '1'}}
                />
            </form>
        )
    }
}

export default AddProject