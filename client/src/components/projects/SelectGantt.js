import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class SelectGantt extends Component {
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
            </form>
        )
    }
}

export default withCookies(SelectGantt);