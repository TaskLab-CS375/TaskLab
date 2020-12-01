import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Chart from "react-google-charts";

class GanttItem extends Component {
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || ''
        };
    }

    render() {
        console.log("props showGantt", this.props.showGantt);
        const { userID } = this.state;
        const rows = this.props.rows;
        if (this.props.showGantt & rows.length > 0 ) {
            return (
                <div>
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="Gantt"
                        loader={<div>Loading Chart</div>}
                        data={
                            [[
                            { type: 'string', label: 'Task Name' },
                            { type: 'string', label: 'Task Description' },
                            { type: 'date', label: 'Start Date' },
                            { type: 'date', label: 'End Date' },
                            { type: 'number', label: 'Duration' },
                            { type: 'number', label: 'Percent Complete' },
                            { type: 'string', label: 'Dependencies' },
                            ]].concat(rows)
                        }
                        rootProps={{ 'data-testid': '1' }}
                        />
                </div>
            );
        } 
        else if (this.props.showGantt) {
            return (
                <div>
                    No tasks associated with this project.
                </div>
            );
        }
        else {
            return (
                <div>
                    Please select an existing project or create a new project
                </div>
            );
        }


    }
}

export default withCookies(GanttItem);
