import {Link} from "react-router-dom";
import React, {Component} from "react";
import {withCookies} from "react-cookie";

class Projectitem extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || ''
        };

    }

    onDelete = (e) => {
        let projectID = e.target.parentNode.parentNode.getAttribute("projectID");
        this.props.deleteProject(projectID);
    }

    render() {
        const rows = this.props.rows
        console.log(rows);
        console.log(rows.length);
        return (
            <div id="project-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th align="center">Group</th>
                        <th align="center">Start</th>
                        <th align="center">End</th>
                        <th align="center">Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {rows.map((row) => (
                        <tr projectID={row.id}>
                        <th component="th" scope="row"><Link to={"/gantt?projectid=".concat(row.id)}>{row.name}</Link></th>
                        <th align="right">{row.group}</th>
                        <th align="right">{new Date(row.start).toLocaleDateString("en-US")}</th>
                        <th align="right">{new Date(row.end).toLocaleDateString("en-US")}</th>
                        <th align="right">{row.status}</th>
                        <th align="right"><button onClick={this.onDelete}>Delete</button></th>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default withCookies(Projectitem);