import { Button, Descriptions, Spin } from 'antd';
import React, { Component } from "react";
import { checkSession } from "../../service/action/user/AuthenticateAction";
import { fetchProfileDetail } from "../../service/action/user/ProfileAction";
import { connect } from "react-redux";
import { showRole } from "../../service/util/util";
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { history } from '../../service/helper/History';

class PersonalProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession();
        this.props.fetchProfileDetails(this.props.empID);
    };

    componentDidUpdate = (prevProp) => {
        if (prevProp.profile !== this.props.profile) {
            this.setState({ isLoad: false })
        }
    }

    onMoveToChangePassword = () => {
        history.push('/change-password')
    }

    render() {
        var { profile } = this.props;
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <Descriptions title="Project Info" layout="horizontal" bordered
                        extra={<Button onClick={this.onMoveToChangePassword} type="primary">Change Password</Button>} >
                        <Descriptions.Item span={3} label="Name">
                            {(profile || {}).name}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Address">
                            {(profile || {}).address}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Identity Number">
                            {(profile || {}).identityNumber}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Email">
                            {(profile || {}).email}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Phone">
                            {(profile || {}).phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Role">
                            {showRole((profile || {}).roleName)}
                        </Descriptions.Item>
                    </Descriptions>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        profile: state.ProfileFetchReducer,
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID));
        },
        checkSession: () => {
            dispatch(checkSession());
        },
    };
};

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(PersonalProfile);