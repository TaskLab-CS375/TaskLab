import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <Route path="/login">

                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
