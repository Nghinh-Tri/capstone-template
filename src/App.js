import './App.css';
import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Login from './screens/login/Login';
import {history} from './store/helper/history'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from './store/component/PrivateRoute'



class App extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <ReactNotification />
                    {/* <Switch> */}
                    <div>
                        <PrivateRoute exact path="/" component={Layout} />
                        <Route path="/login" component={Login} />
                    </div>
                    {/* </Switch> */}
                </Router>
                {/* <SignIn/> */}
            </div>
        );
    }
}

export default App;
