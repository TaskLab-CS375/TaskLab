import React, {Component} from "react";
import {withCookies} from "react-cookie";
import Tasks from "./Tasks";

class Project extends Component  {
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

export default withCookies(Project)