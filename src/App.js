import './App.css';
import 'react-notifications-component/dist/theme.css'
import LoginPage from './screen/login/Login';
import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Route, Router } from 'react-router-dom';
import RouteList from './RouterMap'
import { history } from './service/helper/History';
import { PrivateRoute } from './service/PrivateRouter';
import ReactNotification from 'react-notifications-component'
import ChangePassword from './screen/change-password/ChangePassword';

class App extends Component {

    showPrivateRoute = (RouteList) => {
        var result = null
        if (RouteList.length > 0) {
            result = RouteList.map((route, index) => {
                return (
                    <PrivateRoute key={index} exact path={route.path} component={Layout} />
                )
            });
        }
        return result
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification />
                <Router history={history}>
                    <div>
                        {this.showPrivateRoute(RouteList)}
                        <Route path="/login" component={LoginPage} />
                        <Route path="/change-password" component={ChangePassword} />
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;