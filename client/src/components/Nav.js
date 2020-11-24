import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import withAuth from "../utilities/withAuth";
import Home from "./Home";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import { checkLogin } from "../utilities/auth";
import Dashboard from "./Dashboard";
import Project from "./projects/Project";
import Gantt from "./projects/Gantt";

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        checkLogin().then(result => this.setState({ isAuthenticated: result }));
    }

    async logout(e) {
        e.preventDefault();
        await fetch('/logout');
        this.setState({ isAuthenticated: false });
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto" href="#">
                            <img width="75%" height="75%" src="/logo.png" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"/>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {
                                isAuthenticated &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/project">Projects</Link>
                                </li>
                            }
                            {isAuthenticated &&
                              <li className="nav-item">
                              <Link className="nav-link" to="/gantt">Gantt Chart</Link>
                          </li>
                            }
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                { isAuthenticated
                                    ? <p onClick={this.logout.bind(this)}>Logout</p>
                                    : <Link className="nav-link" to="/login">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/dashboard"
                        component={withAuth(Dashboard)}
                        render={(props) => (
                            withAuth(<Dashboard {...props} />)
                        )}/>
                    <Route
                        path="/project"
                        component={withAuth(Project)}
                        render={(props) => (
                            withAuth(<Project {...props} />)
                        )}/>
                     <Route
                        path="/gantt"
                        component={withAuth(Gantt)}
                        render={(props) => (
                            withAuth(<Gantt {...props} />)
                        )}/>
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} />
                        )} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        );
    }
}