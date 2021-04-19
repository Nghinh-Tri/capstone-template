import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/project/ProjectAction";
import { checkSession } from '../../service/action/AuthenticateAction';
import { Tabs } from 'antd';
import ProjectProfile from '../../component/project-detail/ProjectProfile';
import ListEmployee from '../../component/project-detail/ListEmployee';
import PositionRequire from '../../component/project-detail/PositionRequire';
const TabPane = Tabs.TabPane;

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
            project: {},
            projectField: 0,
            projectType: 0,
            status: -1,
            name: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project !== prevState.project) {
            return { someState: nextProps.project };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            if (typeof this.props.project.isCreateNew === 'undefined')
                this.setState({ project: this.props.project })
        }
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    projectTypeField = (type, field, status, name) => {
        this.setState({ projectType: type, projectField: field, status: status, name: name })
    }

    showDetail = (select) => {
        if (select === 1)
            return <ProjectProfile projectID={this.props.match.params.id} projectTypeField={this.projectTypeField} />
        if (select === 2)
            return <ListEmployee projectID={this.props.match.params.id} projectType={this.state.projectType} projectField={this.state.projectField} status={this.state.status} projectName={this.state.name} />
        if (select === 3)
            return <PositionRequire projectID={this.props.match.params.id} />
    }

    render() {
        var { select } = this.state
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects Detail</li>
                </ol>
                <div className='card mb-4'>
                    <div class="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Project Details" key={1}></TabPane>
                            <TabPane tab="Employee List" key={2}></TabPane>
                            <TabPane tab="Position Requirements" key={3}></TabPane>
                        </Tabs>
                    </div>
                    <div class="card-body">
                        {this.showDetail(select)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(null, mapDispatchToProp)(ProjectDetail);