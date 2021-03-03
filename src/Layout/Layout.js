import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteList from "../RouteMap";

import NavBar from '../components/nav-bar/NavBar';
import Navigation from '../components/navigation/Navigation';
import { connect } from 'react-redux'





class Layout extends Component {

    showContent = (RouteList) => {
        var result = null;
        if (RouteList.length > 0) {
            result = RouteList.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact} component={route.main} />
                )
            });
        }
        return <Switch> {result} </Switch>
    }

    // renderLogin = () => {     
    //     return !localStorage.hasOwnProperty('username') 
    //  }
 

    render() {
        return (
                <div className="wrapper ">
                    {this.renderLogin()}
                    <Navigation />
                    <div className="main-panel">
                        <NavBar />
                        <div className="content">
                            {this.showContent(RouteList)}
                        </div>
                    </div>
                </div>
        );
    }
}



const mapState = state => {
    const { userLogin } = state.authentication;
    return { userLogin }
}

const mapDispatchToProp = (dispatch) => {
    return {
       
    }
}
  
export default connect(mapState, mapDispatchToProp)(Layout);