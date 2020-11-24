import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Chart from "react-google-charts";

class Tasks extends Component {
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || ''
        };
    }

    render() {
        const { userID } = this.state;

        const query = new URLSearchParams(this.props.location.search);
        const projectid = query.get("projectid");
        console.log(projectid);
        
        return (
            <div>
                Here are all the tasks {userID} for project id {projectid}
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                        { type: 'string', label: 'Task ID' },
                        { type: 'string', label: 'Task Name' },
                        { type: 'date', label: 'Start Date' },
                        { type: 'date', label: 'End Date' },
                        { type: 'number', label: 'Duration' },
                        { type: 'number', label: 'Percent Complete' },
                        { type: 'string', label: 'Dependencies' },
                        ],
                        [
                        'Research',
                        'Find sources',
                        new Date(2015, 0, 1),
                        new Date(2015, 0, 5),
                        null,
                        100,
                        null,
                        ],
                        [
                        'Write',
                        'Write paper',
                        null,
                        new Date(2015, 0, 9),
                        3 * 24 * 60 * 60 * 1000,
                        25,
                        'Research,Outline',
                        ],
                        [
                        'Cite',
                        'Create bibliography',
                        null,
                        new Date(2015, 0, 7),
                        1 * 24 * 60 * 60 * 1000,
                        20,
                        'Research',
                        ],
                        [
                        'Complete',
                        'Hand in paper',
                        null,
                        new Date(2015, 0, 10),
                        1 * 24 * 60 * 60 * 1000,
                        0,
                        'Cite,Write',
                        ],
                        [
                        'Outline',
                        'Outline paper',
                        null,
                        new Date(2015, 0, 6),
                        1 * 24 * 60 * 60 * 1000,
                        100,
                        'Research',
                        ],
                    ]}
                    rootProps={{ 'data-testid': '1' }}
                    />
            </div>
        );
    }
}

export default withCookies(Tasks);
