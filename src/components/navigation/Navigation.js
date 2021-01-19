import React, { Component } from 'react';
import NavigationItems from './navigation-items/NavigationItems';

class Navigation extends Component {
    render() {
        return (
            <div class="sidebar" data-color="purple" data-background-color="white" >
                <div class="logo">
                    <a href="http://www.creative-tim.com" class="simple-text logo-normal">
                        ESMS
                            </a>
                </div>
                <div class="sidebar-wrapper">
                    <ul class="nav">
                        <NavigationItems icon='dashboard' name='Dashboard' active='active' />
                        <NavigationItems icon='content_paste' name='Task' active='' />
                        <NavigationItems icon='person' name='Profile' active='' />
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navigation;