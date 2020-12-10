import React, {Component} from "react";
import {withCookies} from "react-cookie";
import AddGroups from "./groups/AddGroups";
import GetGroups from "./groups/GetGroups";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userID: cookies.get('userID') || '',
            shouldUpdate: false
        };
    }

    updateDashboard = (shouldUpdate) => {
        this.setState({shouldUpdate: shouldUpdate});
    }

    render() {
        const { userID } = this.state;

        return (
            <div>
                <h1>Welcome { userID }!</h1>
                <h3>Add Group Here</h3>
                <AddGroups updateDashboard={this.updateDashboard} />
                <h3>All Groups</h3>
                <GetGroups {...this.state} updateDashboard={this.updateDashboard}/>
            </div>
        );
    }
}

export default withCookies(Dashboard);