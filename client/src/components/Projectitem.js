import React, { Component } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link, Route, Switch, withRouter, BrowserRouter as Router} from "react-router-dom";
import withAuth from "../utilities/withAuth";

import Tasks from './Tasks';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


class Projectitem extends Component {    
    constructor(props) {
        super(props);
        const { cookies } = props;
    }

    render() {
        const rows = this.props.rows
        console.log(rows);
        console.log(rows.length);
        return (
            <div>
                <TableContainer component={Paper}>
                <Table className="Project table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell align="center">Group</TableCell>
                        <TableCell align="center">Start</TableCell>
                        <TableCell align="center">End</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row"><Link to={"/tasks"}>{row.name}</Link></TableCell>
                        {/* <TableCell component="th" scope="row"><Link to={"/tasks?projectid=".concat(row.id)}>{row.name}</Link></TableCell> */}
                        <TableCell align="right">{row.group}</TableCell>
                        <TableCell align="right">{row.start}</TableCell>
                        <TableCell align="right">{row.end}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

            </div>
        );
    }
}

export default withRouter(Projectitem);