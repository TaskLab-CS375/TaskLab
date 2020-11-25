import React, { Component } from 'react'
import '../Project.css';
import {withCookies} from "react-cookie";

import Table from 'react-bootstrap/Table';


class ProjectTable extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;

    }


    render() {
        console.log("reached table");
        return (
            <Table>

            </Table>
        )
    }
}

export default withCookies(ProjectTable);