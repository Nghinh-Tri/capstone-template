import { Tabs } from 'antd';
import React, { Component } from 'react';
import PersonalProfile from '../../component/profile/PersonalProfile';
import SkillProfile from '../../component/profile/SkillProfile';
import { checkSession } from "../../service/action/user/AuthenticateAction";
import { connect } from "react-redux";
const TabPane = Tabs.TabPane;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
        }
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    showDetail = (select, result) => {
        if (select === 1)
            return <PersonalProfile empID={result} />
        if (select === 2)
            return <SkillProfile empID={result} />;
    }

    render() {
        var { select } = this.state
        var result = "";
        var { empID } = this.props;
        if (typeof empID === "undefined") result = this.props.match.params.id;
        else result = empID;
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Profile Detail</li>
                </ol>
                <div class="card mb-4">
                    <div class="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Personal Infomation" key={1}></TabPane>
                            {typeof this.props.match !== 'undefined' ?
                                <TabPane tab="Skill Information" key={2}></TabPane>
                                : ''
                            }
                        </Tabs>
                    </div>
                    <div class="card-body">
                        {this.showDetail(select, result)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession());
        },
    };
};

export default connect(null, mapDispatchToProp)(Profile);