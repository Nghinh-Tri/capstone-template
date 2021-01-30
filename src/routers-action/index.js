import React, { Component } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from '../screens/dashboard/Dashboard';
import Project from '../screens/project/Project';
import CreatePosition from '../screens/create-position/CreatePosition';
import Projectdetail from '../screens/project-detail/ProjectDetail';



class index extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/project">
                        <Project />
                    </Route>
                    <Route path="/profile">
                        <CreatePosition />
                    </Route>
                    <Route path="/projectdetail">
                        <Projectdetail />
                    </Route>
                </Switch>

            </div>
        );
    }
}

export default index;