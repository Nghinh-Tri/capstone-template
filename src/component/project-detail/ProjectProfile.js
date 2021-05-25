import { Badge, Button, Descriptions, Modal, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import * as Action from '../../service/action/project/ProjectAction'
import { showStatus, showBadge, getRole } from '../../service/util/util';
import TextArea from 'antd/lib/input/TextArea';

class ProjectProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.fetchProjectDetail(this.props.projectID)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.project !== this.props.project) {
            var { project } = this.props
            if (typeof project.projectID !== 'undefined') {
                this.setState({ isLoad: false })
                this.props.projectTypeField(project.typeID, project.fieldID, project.status, project.projectName, project.dateBegin, project.dateEstimatedEnd)
            }
        } else if (prevProps.status !== this.props.status) {
            let { fetchProjectDetail, projectID } = this.props
            if (this.props.status)
                Modal.success({
                    title: 'Project has finished',
                    onOk() {
                        fetchProjectDetail(projectID)
                    }
                })
            else
                Modal.error({
                    title: 'Finish Project Failed'
                })
        }
    }

    onChangeStatusToFinish = () => {
        var { match, changeStatusToFinish, project } = this.props
        confirm({
            title: 'Are you sure you want to finish this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                changeStatusToFinish(match.params.id, project.projectName)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        var { project } = this.props
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <Descriptions title="Project Info" layout='horizontal' bordered
                        extra={<React.Fragment>
                            {getRole() === 'PM' ?
                                project.status < 4 ?
                                    <>
                                        <NavLink to={`/project/detail/${project.projectID}/edit`} style={{ marginRight: 10 }} type="default" >Update</NavLink>
                                        {project.status === 3 ?
                                            <Button type="primary" onClick={this.onChangeStatusToFinish}>Finish</Button>
                                            : ''}
                                    </>
                                    : ''
                                : ''
                            }
                        </React.Fragment>}>
                        <Descriptions.Item span={3} label="Project Name">{project.projectName} </Descriptions.Item>
                        <Descriptions.Item span={3} label="Project Type">{project.typeName}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Project Field">{project.fieldName}</Descriptions.Item>
                        <Descriptions.Item label="Start Date">{moment(project.dateBegin).format('DD-MM-YYYY')}</Descriptions.Item>
                        <Descriptions.Item label={project.dateEnd === null ? 'Estimated End Date' : 'Ended Date'} span={2}>
                            {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status={showBadge(project.status)} text={showStatus(project.status)} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                            <TextArea value={project.description} readOnly autoSize={true}
                                style={{ backgroundColor: 'white', border: 'none' }} />
                        </Descriptions.Item>
                    </Descriptions>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectDetailFetchReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        changeStatusToFinish: (projectID, projectName) => {
            dispatch(Action.changeStatusToFinish(projectID, projectName))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProjectProfile);