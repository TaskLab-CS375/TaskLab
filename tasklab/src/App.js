import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import Login from './components/Login'

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container d-flex align-items-center flex-column">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
