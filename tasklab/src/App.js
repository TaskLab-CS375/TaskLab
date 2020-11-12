import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import Login from './components/Login'
import Register from "./components/Register";
import withAuth from "./utilities/withAuth";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container d-flex align-items-center flex-column">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">
                            <img src="logo.png" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route path="/" exact component={withAuth(Home)} />
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
