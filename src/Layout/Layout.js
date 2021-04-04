import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../component/navigation/Navigation';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";
import { notification } from 'antd';
import { connect } from 'react-redux';

import { sendNotificate } from "../service/action/FirebaseAction";

class Layout extends Component {

    componentDidMount = () => {
        const messaging = firebase.messaging()
        messaging.requestPermission().then(() => {
            return messaging.getToken()
        }).then(token => {
            console.log('token', token)
        })
        // this.showNotificate()
    }

    showNotificate = () => {
        notification.info({
            description: 'This is the content of the notification.',
            placement: 'bottomRight',
            style: {
                fontWeight: 500,
                border: 20
            }
        });
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
    onHandle = () => {
        this.props.sendNoti()
    }
    render() {
        return (
            <div className="wrapper ">
                <Navigation />
                <div className="main-panel">
                    <NavBar />
                    <div className="content">
                        <button onClick={this.onHandle}>Send Noti</button>
                        {this.showContent(RouteList)}
                    </div>
                </div>
            </div>
        );
    }
}

const map = (dispatch) => {
    return{
        sendNoti:()=>{
            dispatch(sendNotificate())
        }
    }
}
export default connect(null,map) (Layout);