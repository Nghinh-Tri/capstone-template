import React, { Component } from 'react';
import Header from '../component/header/Header';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import { Route, Switch } from 'react-router-dom';
import firebase from "../service/firebase/firebase";
import { connect } from 'react-redux';
import { notification } from 'antd';
import { fetchProject } from '../service/action/project/ProjectAction';
import { history } from '../service/helper/History';
import moment from 'moment';
import { getEmpID } from '../service/util/util';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notiList: [],
            title: '',
            body: '',
            newest: {},
            number: 0
        }
    }

    componentDidMount = () => {
        this.fetchNotificate()
    }

    fetchNotificate = () => {
        const fb = firebase.database().ref('fir-4d2be-default-rtdb')
        var empID = getEmpID()
        fb.on('value', snapshot => {
            var notiObj = snapshot.val()
            var temp = []
            var newest = {}
            var { number } = this.state
            number = 0
            for (let id in notiObj) {
                if (notiObj[id].topic === empID) {
                    temp.push({ id, ...notiObj[id] })
                    if (notiObj[id].status) {
                        newest = { id, ...notiObj[id] }
                        number++
                    }
                }
            }
            temp = temp.sort((a, b) => { return moment(b.dateCreate).diff(a.dateCreate) })
            this.setState({ notiList: temp, newest: newest, number: number })
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

    onSeen = (id, status, option) => {
        if (status) {
            const fb = firebase.database().ref('fir-4d2be-default-rtdb').child(id)
            fb.update({ status: false })
            if (option === 'single') {
                history.push('/project')
                this.props.fetchProject();
                notification.destroy()
            }
        }
    }

    render() {
        return (
            <div>
                <Header notiList={this.state.notiList}
                    newest={this.state.newest}
                    number={this.state.number}
                    onSeenNoti={this.onSeen}
                />
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
        fetchProject: () => {
            dispatch(fetchProject(1, '', true))
        }
    }
}
export default connect(null, map)(Layout);