import React, {Component} from "react";
import {withCookies} from "react-cookie";
import AddGroups from "./AddGroups";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || ''
        };
    }

    render() {
        const { userID } = this.state;

        return (
            <div>
                <h1>Welcome { userID }!</h1>
                <h3>Add Group Here</h3>
                <AddGroups />
            </div>
        );
    }
}

export default withCookies(Dashboard);