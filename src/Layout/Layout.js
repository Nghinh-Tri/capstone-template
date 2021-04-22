import React, { Component } from 'react';
import Header from '../component/header/Header';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import { Route, Switch } from 'react-router-dom';
import firebase from "../service/firebase/firebase";
import { store } from 'react-notifications-component';
import { recieveNotificate, sendNotificate } from '../service/action/FirebaseAction';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { fetchProject } from '../service/action/project/ProjectAction';

class Layout extends Component {

    componentDidMount = async () => {
        const messaging = firebase.messaging()
        messaging.getToken({ vapidKey: 'BCzV0OJHq4w2DQyltsiIxhhiM7Ce4yLOujK-1QRgWkmjUloUxEPRkvp2PgtvuRQ0nj8rVe1OTIcA2eKTIbEZE2w' })
            .then(token => {
                if (token) {
                    localStorage.setItem('FirebaseToken', JSON.stringify(token))
                    this.props.recievedNoti(token)
                }
            })
        messaging.onMessage((payload) => {
            console.log('componentDidMount');
            this.props.fetchProject();
            this.showNotificate(payload.notification);
        });
        // setInterval(() => {           
        //     messaging.onMessage((payload) => {
        //         console.log('setInterval')
        //         this.props.fetchProject()
        //         this.showNotificate(payload.notification)
        //     });
        // }, 1000);

    }

    showNotificate = (messaging) => {
        notification.open({
            message: messaging.title,
            description: messaging.body,
            duration: 0,
            placement: 'bottomRight'
        });
    }

    // componentDidUpdate = (prev) => {
    //     const messaging = firebase.messaging()
    //     messaging.getToken({ vapidKey: 'BCzV0OJHq4w2DQyltsiIxhhiM7Ce4yLOujK-1QRgWkmjUloUxEPRkvp2PgtvuRQ0nj8rVe1OTIcA2eKTIbEZE2w' })
    //         .then(token => {
    //             if (token) {
    //                 localStorage.setItem('FirebaseToken', JSON.stringify(token))
    //                 this.props.recievedNoti(token)
    //             }
    //         })
    //     messaging.onMessage((payload) => {
    //         console.log('componentDidUpdate')
    //         this.showNotificate(payload.notification)
    //     });
    // }

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
    send = () => {
        this.props.sendNotificate()
    }
    render() {
        return (
            <div>
                <Header />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <NavBar />
                    </div>
                    <div id="layoutSidenav_content">
                        {/* <button onClick={this.send}>Send</button> */}
                        <main>
                            <div class="container-fluid">
                                {this.showContent(RouteList)}
                            </div>
                        </main>

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
        },
        sendNotificate: () => {
            dispatch(sendNotificate({ title: 'hello', body: 'aaa' }))
        },
        fetchProject: () => {
            dispatch(fetchProject(1, ''))
        }
    }
}
export default connect(null, map)(Layout);