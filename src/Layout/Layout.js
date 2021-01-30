import React, { Component } from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Rout from '../routers-action/index'

import NavBar from '../components/nav-bar/NavBar';
import Navigation from '../components/navigation/Navigation';

class Layout extends Component {

    render() {
        return (
            <Router>
                <div className="wrapper ">
                    <Navigation />
                    <div className="main-panel">
                        <NavBar />
                        <div className="content">
                            <Rout></Rout>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Layout;