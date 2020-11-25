import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Tasks from "./Tasks";


class Gantt extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;

    }


    render() {
        return (
                <div>
                    New Page
                    <Tasks />
                </div>                   
        );
    }
}

export default withCookies(Gantt)