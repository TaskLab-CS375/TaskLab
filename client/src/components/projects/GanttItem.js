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
        const { userID } = this.state;
        const rows = this.props.rows;
        // const rows = [{
        //     name: 'research',
        //     description: 'somehow',
        //     start: new Date(2020, 1, 1),
        //     end: new Date(2021, 12, 4),
        //     duration: 100,
        //     percentComplete: 100,
        //     dependencies: null
        // }]

        // const rows = [                   
        //     [
        //     'Research',
        //     'Find sources',
        //     new Date(2010, 1, 1),
        //     new Date(2020, 10, 5),
        //     null,
        //     100,
        //     null,
        //     ],
        //     [
        //         'Research2',
        //         'Find sources',
        //         new Date(2019, 10, 1),
        //         new Date(2022, 5, 6),
        //         null,
        //         100,
        //         null,
        //     ],
        // ]
        // const query = new URLSearchParams(this.props.location.search);
        // const projectid = query.get("projectid");
        // console.log(projectid);

        return (
            <div>
                Here are all the tasks {userID} for project id 
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
                        // [
                        // 'Research',
                        // 'Find sources',
                        // new Date(2015, 0, 1),
                        // new Date(2015, 0, 5),
                        // null,
                        // 100,
                        // null,
                        // ],
                    }
                    rootProps={{ 'data-testid': '1' }}
                    />
            </div>
        );
    }
}

export default withCookies(GanttItem);
