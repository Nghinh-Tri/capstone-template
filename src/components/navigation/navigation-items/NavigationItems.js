import React, { Component } from 'react';

class NavigationItems extends Component {
    render() {
        return (
            <li class={`nav-item ${this.props.active}`}>
                <a class="nav-link">
                    <i class="material-icons">{this.props.icon}</i>
                    <p>{this.props.name}</p>
                </a>
            </li>
        );
    }
}

export default NavigationItems;