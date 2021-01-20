import React, { Component } from 'react';
import NavBar from '../components/nav-bar/NavBar';
import Navigation from '../components/navigation/Navigation';
import CreateProject from '../screens/create-project/CreateProject';
import Dashboard from '../screens/dashboard/Dashboard';
import Project from '../screens/project/Project';

class Layout extends Component {

    render() {
        return (
            <div className="wrapper ">
                <Navigation />
                <div className="main-panel">
                    <NavBar />
                    <div className="content">
                        {/* <Dashboard /> */}
                        {/* <Project /> */}
                        <CreateProject/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;