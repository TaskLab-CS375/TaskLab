import './App.css';

import {
    BrowserRouter as Router,
} from 'react-router-dom';
import Nav from "./components/Nav";
import { CookiesProvider } from "react-cookie";

function App() {
    return (
        <CookiesProvider>
            <Router>
                <div className="App">
                    <Nav />
                </div>
            </Router>
        </CookiesProvider>
    );
}

export default App;
