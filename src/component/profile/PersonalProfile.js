import { Button, Descriptions } from 'antd';
import React, { Component } from "react";
import { checkSession } from "../../service/action/AuthenticateAction";
import { fetchProfileDetail } from "../../service/action/ProfileAction";
import { connect } from "react-redux";
import { showRole } from "../../service/util/util";
import { compose } from 'redux';
import { withRouter } from 'react-router';

class PersonalProfile extends Component {
    componentDidMount = () => {
        this.props.checkSession();
        this.props.fetchProfileDetails(this.props.empID);
        console.log(this.props.match)
    };

    render() {
        var { profile } = this.props;
        return (
            <React.Fragment>
                <Descriptions title="Project Info" layout="horizontal" bordered extra={typeof this.props.match.params.id === 'undefined' ? <Button type="primary">Edit</Button> : ''}        >
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