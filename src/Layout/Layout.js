import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../component/navigation/Navigation';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";
import { notification } from 'antd';
import { connect } from 'react-redux';
import { recieveNotificate } from '../service/action/FirebaseAction';

class Layout extends Component {

    componentDidMount = () => {
        const messaging = firebase.messaging()
        messaging.getToken({ vapidKey: 'BCzV0OJHq4w2DQyltsiIxhhiM7Ce4yLOujK-1QRgWkmjUloUxEPRkvp2PgtvuRQ0nj8rVe1OTIcA2eKTIbEZE2w' })
            .then(token => {
                if (token)
                    this.props.recievedNoti(token)
            })
        messaging.onMessage((payload) => {
            this.showNotificate(payload.notification)
        });
    }

    showNotificate = (messaging) => {
        notification.info({
            message: messaging.title,
            description: messaging.body,
            placement: 'bottomRight'
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
                        {this.showContent(RouteList)}
                    </div>
                </div>
            </div>
        );
    }
}
const map = (dispatch) => {
    return {
        recievedNoti: (token) => {
            dispatch(recieveNotificate(token))
        }
    }
}
export default connect(null, map)(Layout);