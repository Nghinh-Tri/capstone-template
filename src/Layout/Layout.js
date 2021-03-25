import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../component/navigation/Navigation';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";

class Layout extends Component {

    componentDidMount = () => {
        const messaging = firebase.messaging()
        messaging.requestPermission().then(() => {
            return messaging.getToken()
        }).then(token => {
            console.log('token', token)
        })
    }

    showContent = (RouteList) => {
        var result = null;
        if (RouteList.length > 0) {
            result = RouteList.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact} render={route.main} />
                )
            });
        }
        return <Switch> {result} </Switch>
    }
    render() {
        return (
            <div className="wrapper ">
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
export default Layout;