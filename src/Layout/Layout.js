import React, { Component } from 'react';
import NavBar from '../components/nav-bar/NavBar';
import Navigation from '../components/navigation/Navigation';
import Dashboard from '../screens/dashboard/Dashboard';
import Task from '../screens/task/Task';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                name: 'Project Name',
                description: 'Project Description'
            }
        }
    }

    render() {
        return (
            <div class="wrapper ">
                <Navigation />
                <div className="main-panel">
                    <NavBar />
                    <div className="content">
                        {/* <Dashboard /> */}
                        <Task project={this.state.project} />
                        <Task project={this.state.project} />
                        <Task project={this.state.project} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;