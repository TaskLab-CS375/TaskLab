import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Projectitem from './Projectitem';
import AddProject from './AddProject';
import EditProject from './EditProject';

class Project extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            projects: [],
            openEdit: false,
            editSelected: {},
            editSuccess: false,
            deleteSuccess: false
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
            this.setState( { ...this.state, projects: res.rows, editSuccess: false, deleteSuccess: false});
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    addProject = (info) => {
        console.log("send to back end !!!!!", info);
        fetch("/addProject", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
        .then((data) => {
            console.log(data.rows);
            this.setState( { ...this.state, projects: data.rows, editSuccess: false, deleteSuccess: false } );
            console.log("Success!");
        })
    }

    getEditProjectInfo = (projectID) => {
        if (projectID) {
            console.log("initiating edit for", projectID);
            fetch(`/getProjectInfo?projectID=${projectID}`).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then( (res) => {
                console.log("Success!");
                console.log("fetched", res.rows);
                this.setState({...this.state, openEdit: true, editSelected: res.rows, editSuccess: false, deleteSuccess: false});
            }).catch(function (error) {
                console.log(error);
            });
        }

    }

    editProject = (info) => {
        console.log("received on editProject", info);
        if (info.projectID) {
            fetch("/updateProjectInfo", {
                method: 'PUT', 
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            }).then((response) => {
                if (response.status === 200) {
                    console.log("success!");
                }
                return response.json()
            })
            .then((data) => {
                console.log(data.rows);
                this.setState({...this.state, openEdit: false, editSelected: {}, editSuccess: true, deleteSuccess: false});
            }).catch(function (error) {
                console.log(error);
            });

            fetch(`/getProject?userID=${this.state.userID}`).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then( (res) => {
                console.log("Success!");
                console.log("fetched", res.rows);
                this.setState( { ...this.state, projects: res.rows});
            }).catch(function (error) {
                console.log(error);
            });
        };
    }

    deleteProject = (projectID) => {
        console.log("initating delete for", projectID);
        fetch(`/deleteProject?projectID=${projectID}`, {
            method: 'delete'
          }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then( (res) => {
            console.log("Success!");
        }).catch(function (error) {
            console.log(error);
        });
        
        console.log("starting to fetch");
        fetch(`/getProject?userID=${this.state.userID}`).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then( (res) => {
            console.log("Success!");
            console.log("fetched", res.rows);
            let deleteSuccess = true;
            res.rows.map( (project) => {
                deleteSuccess = project.projectid === projectID;
            })
            this.setState( { ...this.state, projects: res.rows, editSuccess: false, deleteSuccess: deleteSuccess});
        }).catch(function (error) {
            console.log(error);
        });
    }

    renderTableData = () => {
        let rows = [];
        this.state['projects'].map( (project) => {
            let eachProject = {};
            eachProject['id'] = project.projectid;
            eachProject['name'] = project.projectname;
            eachProject['group'] = project.groupname;
            eachProject['start'] = project.starttime;
            eachProject['end'] = project.endtime;
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

        let editPopup = <div></div>;
        if (this.state.openEdit) {
            editPopup = <EditProject openEdit={this.state.openEdit} closeEdit={this.closeEdit} oldProject={this.state.editSelected} editProject={this.editProject} />
        }

        let editMessage = <div></div>;
        if (this.state.editSuccess) {
            editMessage = <p style={{color: "red"}}>Your changes have been saved.</p>
        }

        let deleteMessage = <div></div>;
        if (this.state.deleteSuccess) {
            deleteMessage = <p style={{color: "red"}}>The project has been successfully deleted.</p>
        }

        return (
                <div>
                    <AddProject addProject={this.addProject} />
                    <br />
                    {editPopup}
                    {editMessage}
                    {deleteMessage}
                    <Projectitem rows={rows} deleteProject={this.deleteProject} getEditProjectInfo={this.getEditProjectInfo} />
                </div>                   
        );
    }
}

export default withCookies(Project);