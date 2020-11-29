import React, {Component} from "react";
import {withCookies} from "react-cookie";
import GanttItem from "./GanttItem";
import AddTask from "./AddTask";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
 

class Gantt extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            projectID: null,
            tasks: [],
            needUpdate: false,
            projectList: []
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
                this.setState( { userID: this.state.userID, tasks: res.rows, projectID: this.state.projectID, needUpdate: false, projectList: this.state.projectList});
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
            this.setState( { userID: this.state.userID, tasks: this.state.tasks, projectID: this.state.projectID, needUpdate: false, projectList: options});
        }).catch(function (error) {
            console.log(error);
        });

    }

    componentDidUpdate() {
        console.log("starting to fetch");
        if (this.state.projectID & this.state.needUpdate) {
            fetch(`/getTask?projectID=${this.state.projectID}`).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then( (res) => {
                console.log("Success!");
                console.log("fetched", res.rows);
                this.setState( { userID: this.state.userID, tasks: res.rows, projectID: this.state.projectID, needUpdate: false, projectList: this.state.projectList});
            }).catch(function (error) {
                console.log(error);
            });
        };
    }

    addInfo = (info) => {
        console.log("send to back end !!!!!", info);
        if (!info){
            console.log("nothing");
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
            this.setState( { userID: this.state.userID, tasks: res.rows, projectID: this.state.projectID, needUpdate: true, projectList: this.state.projectList});
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
        this.setState( { userID: this.state.userID, projectID: e.value, tasks: [], needUpdate: true, projectList: this.state.projectList});
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

        this.addInfo(null);

        return (
                <div>
                    Select the project you want to view:
                    <Dropdown options={options} onChange={this.onSelectDropDown} value={defaultOption} placeholder="Select a project" />;

                    <AddTask addInfo={this.addInfo} />
                    <GanttItem showGantt={showGantt} rows={rows} />
                </div>                   
        );
    }
}

export default withCookies(Gantt)