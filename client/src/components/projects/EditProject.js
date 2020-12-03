import React, {Component} from "react";
import {withCookies} from "react-cookie";
import './FormTable.css';
import Modal from 'react-modal';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class EditProject extends Component  {
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

    componentDidMount() {
        console.log("cdm");
        if (this.props.oldProject[0] != {}) {
            let oldProject = this.props.oldProject[0];
            this.setState({...this.state, name: oldProject.projectname, group: oldProject.groupname, start: new Date(oldProject.starttime), end: new Date(oldProject.endtime), status: oldProject.projectstatus});
            console.log("cdm this.state", this.state);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("this.state in onSubmit", this.state);
        let info = {...this.state, projectID: this.props.oldProject[0].projectid};
        this.props.editProject(info);
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
        if (this.props.oldProject === [] || this.props.oldProject[0] === {}) {
            return;
        }
        console.log("this.props.oldProject", this.props.oldProject[0]);
        console.log("this.state in Editproject", this.state);
        let editPopupStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              marginBottom          : '-25%',
              transform             : 'translate(-50%, -50%)'
            }
          };
        return (
            <div id="edit-project-popup">
                <Modal
                isOpen={this.props.openEdit}
                onRequestClose={this.props.closeEdit}
                style={editPopupStyles}
                // contentLabel="Edit Modal"
                >
                <p>Edit the project below</p>
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
                                    value="Change"
                                    className="btn"
                                    style={{background: 'lightgrey', width:'100%', height: '100%'}}
                                    />
                                </td>
                            </tr>
                        </table>
                    </form>
                </Modal>
            </div>


        );
    }
}
export default withCookies(EditProject);