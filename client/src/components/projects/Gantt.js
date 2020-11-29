import React, {Component} from "react";
import {withCookies} from "react-cookie";
import GanttItem from "./GanttItem";
import AddTask from "./AddTask";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./Gantt.css"
 

class Gantt extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            projectID: null,
            tasks: [],
            needUpdate: false,
            projectList: [],
            error: false
        };

        const query = new URLSearchParams(this.props.location.search);
        const projectid = query.get("projectid");
        if (projectid) {
            this.state.projectID = projectid;
            console.log("change because of query")
            console.log(this.state);
        }
    }

    componentDidMount() {
        console.log("starting to fetch");
        if (this.state.projectID) {
            fetch(`/getTask?projectID=${this.state.projectID}`).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then( (res) => {
                console.log("Success!");
                console.log("fetched", res.rows);
                this.setState( { ...this.state, tasks: res.rows, needUpdate: false});
            }).catch(function (error) {
                console.log(error);
            });
        };
        // fetch dropdown list
        fetch(`/getProject?userID=${this.state.userID}`).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then( (res) => {
            console.log("Success!");
            console.log("fetched", res.rows);
            let options = [];
            res.rows.map( (project) => {
                options.push({ value: project.projectid, label: project.projectname },)
            });
            console.log("options", options)
            this.setState( { ...this.state, needUpdate: false, projectList: options});
        }).catch(function (error) {
            console.log(error);
        });

    }

    componentDidUpdate() {
        console.log("starting to fetch tasks");

        // update task list
        if (this.state.projectID!=null & this.state.needUpdate) {
            fetch(`/getTask?projectID=${this.state.projectID}`).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then( (res) => {
                console.log("componentDidUpdate");
                this.setState( { ...this.state, tasks: res.rows,needUpdate: false});
            }).catch(function (error) {
                console.log(error);
            });
        };
    }

    addInfo = (info) => {
        console.log("send to back end !!!!!", info);

        // input validation
        if (!info || info.name==='' || info.start==='' || info.end==='' || info.percentcomplete==='') {
            console.log("nothing");
            this.setState( { ...this.state, error: true});
            return;
        }
        
        fetch(`/addTask?projectID=${this.state.projectID}`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
        .then((res) => {
            console.log(res.rows);
            this.setState( { ...this.state, tasks: res.rows, needUpdate: true, error: false});
            console.log("Success!");
        })
    }

    renderData() {
        let rows = [];
        this.state['tasks'].map( (task) => {
            let eachTask = [];
            eachTask.push(task.taskid);
            eachTask.push(task.taskname);
            eachTask.push(new Date(task.starttime));
            eachTask.push(new Date(task.endtime));
            eachTask.push(null);
            eachTask.push(task.percentcomplete);
            eachTask.push(null);
            rows.push(eachTask);
            console.log("eachTask", eachTask);
        });
        console.log("render table data", rows);
        return rows;
    }

    onSelectDropDown = (e) => {
        console.log(e.value);
        this.setState( { ...this.state, projectID: e.value, tasks: [], needUpdate: true});
    }


    render() {
        const userID = this.state.userID;
        const rows = this.renderData();
        console.log("new state", this.state);
        const options = this.state.projectList;

        let showGantt = false;
        let defaultOption = null;
        if (this.state.projectID) {
            showGantt = true;
            options.map( (option) => {
                if (option.value == this.state.projectID) {
                    defaultOption = option;
                    console.log("matching projectid", option.value)
                };
            });
        };

        // Project Message
        let projectMessage;
        if (showGantt) {
            projectMessage=<p>Here are all the tasks for <span className="project-name">{defaultOption.label}</span></p>
        }

        // Display Error Message Option
        let errorMessageBox = <br />;
        if (this.state.error) {
            errorMessageBox= <p style={{color:'red'}}>Invalid Format. Please fill in all fields.</p>
        };

        return (
                <div>
                    Select the project you want to view:
                    <Dropdown options={options} onChange={this.onSelectDropDown} value={defaultOption} placeholder="Select a project" />;

                    <AddTask addInfo={this.addInfo} />

                    {errorMessageBox}

                    {projectMessage}
                    <GanttItem showGantt={showGantt} rows={rows} />
                </div>                   
        );
    }
}

export default withCookies(Gantt)