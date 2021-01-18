import React, { Component } from 'react';
import NavBarItem from './NavBarItems'

class NavBar extends Component {
    render() {
        return (
            <div class="wrapper ">
                <div class="sidebar" data-color="purple" data-background-color="white" >
                    <div class="logo">
                        <a href="http://www.creative-tim.com" class="simple-text logo-normal">
                            Creative Tim
                            </a>
                    </div>
                    <div class="sidebar-wrapper">
                        <ul class="nav">
                            <NavBarItem />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;