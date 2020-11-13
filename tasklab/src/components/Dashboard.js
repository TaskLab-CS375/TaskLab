import React, {Component} from "react";
import {withCookies} from "react-cookie";

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
                Welcome { userID }!
            </div>
        );
    }
}

export default withCookies(Dashboard);