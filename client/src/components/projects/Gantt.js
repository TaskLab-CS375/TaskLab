import React, {Component} from "react";
import {withCookies} from "react-cookie";
import GanttItem from "./GanttItem";
import SelectGantt from "./SelectGantt";

class Gantt extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            tasks: []
        };
    }

    componentDidMount() {
        console.log("starting to fetch");
        fetch(`/getTask?userID=${this.state.userID}`).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then( (res) => {
            console.log("Success!");
            console.log("fetched", res.rows);
            this.setState( { userID: this.state.userID, tasks: res.rows});
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    // addTask = (info) => {
    //     console.log("send to back end !!!!!", info);
    //     fetch("/addTask", {
    //         method: 'POST', 
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(info),
    //     }).then(response => response.json())
    //     .then((data) => {
    //         console.log(data.rows);
    //         this.setState( { userID: this.state.userID, tasks: data.rows } );
    //         console.log("Success!");
    //     })
    // }

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


    render() {
        const userID = this.state.userID;
        const rows = this.renderData();
        console.log("new state", this.state);
        return (
                <div>
                    New Page
                    <SelectGantt />
                    <GanttItem rows={rows} />
                </div>                   
        );
    }
}

export default withCookies(Gantt)