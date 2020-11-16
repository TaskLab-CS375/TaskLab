import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Projectitem from './Projectitem';
import AddProject from './AddProject';

import {Link, Route, Switch, withRouter, BrowserRouter as Router} from "react-router-dom";
import Tasks from './Tasks';
import Dashboard from './Dashboard';

class Project extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            projects: []
        };
    }

    componentDidMount() {
        console.log("starting to fetch");
        fetch(`/getProject?userID=${this.state.userID}`).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then( (res) => {
            console.log("Success!");
            console.log("fetched", res.rows);
            this.setState( { userID: this.state.userID, projects: res.rows});
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    addProject = (info) => {
        console.log("project.js", info);
        fetch("/addProject", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
        .then((data) => {
            console.log(data.rows);
            this.setState( { userID: this.state.userID, projects: data.rows } );
            console.log("Success!");
        })
    }

    renderTableData() {
        let rows = [];
        this.state['projects'].map( (project) => {
            let eachProject = {};
            eachProject['id'] = project.projectid;
            eachProject['name'] = project.projectname;
            eachProject['group'] = project.groupname;
            eachProject['start'] = project.starttime;
            eachProject['end'] = project.endTime;
            eachProject['status'] = project.projectstatus;
            rows.push(eachProject);
        });
        console.log("render table data", rows);
        return rows;
    }
    
    render() {
        const userID = this.state.userID;
        const rows = this.renderTableData();
        console.log("new state", this.state);
        console.log(Array.isArray(this.state['projects']));
        return (
                <div>
                <Switch>
                <Route path="/tasks" exact render={props => (
                    <React.Fragment>
                        <AddProject addProject={this.addProject} />
                        <br />
                        <Tasks {...props} />
                    </React.Fragment>
                )}
                    />  

                <Route path="/project" exact render={props => (
                    <React.Fragment>
                        <AddProject addProject={this.addProject} />
                        <br />
                        <Projectitem rows={rows} />
                        <Tasks {...props} />
                    </React.Fragment>
                )}
                />
                   
                </Switch> 
                </div>                   
        );
    }
}

export default withCookies(Project)