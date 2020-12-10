import React, {Component} from "react";
import {withCookies} from "react-cookie";
import '../Project.css';

class Calendar extends Component {
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
            <div class="form">
            <form action="http://localhost:3000/" method="POST">
                <a class="button" target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=415570296497-2rgopd1mc3q1ofp7sa3ofjmbfb9aef5c.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&flowName=GeneralOAuthFlow">Sign In</a>
                <br>
                <br>
                <label for="token">Token from google</label>
                <input name="token" type="text" placeholder="token copied from google screen">
                <input type="submit" value="Get events">
            </form>
        <hr>
            <form action="http://localhost:3000/events" method="POST">
                <label for="attendee email">Attendee email</label>
                <input type="email" name="to" placeholder="send email to...">
                <label for="event title">Event Title</label>
                <input type="text" name="summary" placeholder="the title of event...">
                <label for="body">Event body</label>
                <input type="text" name="description" placeholder="the message body...">
                <label for="start">Event Year (yyyy)</label>
                <input type="text" name="event_year" placeholder="the event year...">
                <label for="start">Event Start Month (mm)</label>
                <input type="text" name="event_month" placeholder="the event year...">
                <label for="start">Event Day</label>
                <input type="text" name="event_day" placeholder="the event day...">
                <label for="start">Event Hour</label>
                <input type="text" name="event_hour" placeholder="the event hour...">
                <label for="start">Event Duration (minutes)</label>
                <input type="text" name="duration" placeholder="duration of event...">
                <input type="submit" value="Send Event Invite">
            </form>
        </div>
        );
    }
}

export default withCookies(Calendar);