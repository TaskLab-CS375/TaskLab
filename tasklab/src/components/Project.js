import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Projectitem from './Projectitem';
import AddProject from './AddProject';


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
            console.log(Array.isArray(res.rows));
            this.setState( { userID: this.state.userID, projects: res.rows});
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    // addTask = (info) => {
    //     fetch("/addProject", {
    //         method: 'POST', 
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(info),
    //     }).then(function (res) {
    //         this.setState( { projects: res.data.rows })
    //         console.log("Success!")
    //     })
    // }

    renderTableData() {
        let rows = [];
        this.state['projects'].map( (project) => {
            let eachProject = {};
            eachProject['name'] = project.projectname;
            eachProject['group'] = project.groupname;
            eachProject['start'] = project.starttime;
            eachProject['end'] = project.endTime;
            eachProject['status'] = project.projectstatus;
            rows.push(eachProject);
        });
        return rows;
    }
    

    render() {
        const userID = this.state.userID;
        this.renderTableData();
        console.log(this.state);
        console.log(Array.isArray(this.state['projects']));
        return (
            <div>
                Welcome { userID }!
                <AddProject />
                <Projectitem rows={this.renderTableData()} />
            </div>
        );
    }
}



export default withCookies(Project);