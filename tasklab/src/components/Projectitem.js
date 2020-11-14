import React, { Component } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';


const columns = [
    { key: 'name', name: 'Project Name', sortable: true, filterable: true},
    { key: 'group', name: 'Group Name', sortable: true, filterable: true},
    { key: 'start', name: 'Start', sortable: true, filterable: true},
    { key: 'end', name: 'End', sortable: true, filterable: true},
    { key: 'status', name: 'Status', sortable: true, filterable: true}
];

export class Projectitem extends Component {    
    render() {
        const rows = this.props.rows
        console.log(rows);
        return (
            <React.Fragment>
                {console.log(rows)}
                <DataGrid
                    columns={columns}
                    rows={rows}
                />
            </React.Fragment>
        )
    }
}


export default Projectitem
