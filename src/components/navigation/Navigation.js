import React, { Component } from 'react';
import NavigationItems from './navigation-items/NavigationItems';
import {
    NavLink
} from "react-router-dom";
class Navigation extends Component {
    render() {
        return (
            <div className="sidebar" data-color="purple" data-background-color="white" >
            <div className="logo">
                <div className="simple-text logo-normal">
                    ESMS
                </div>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to="/" >
                            <NavigationItems icon='dashboard' name='Dashboard' active='active' />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/project">
                            <NavigationItems icon='content_paste' name='Project' active='' />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile">
                            <NavigationItems icon='person' name='Profile' active='' />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/projectdetail">
                            <NavigationItems icon='person' name='projectdetail' active='' />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
        );
    }
}

export default Navigation;