import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/project/ListEmployeeAction'
import ListEmployeeContent from './ListEmployeeContent';
import { addMoreCandidate, addMorePosition } from '../../service/action/position/PositionAction';
import { Badge, Button, Modal, Spin, Tabs, Tooltip } from 'antd';
import { InfoCircleTwoTone } from "@ant-design/icons";
import { getRole } from '../../service/util/util';
import ListRequirement from './ListRequirement';
import AddMoreRequirementModal from './AddMoreRequirementModal';

const TabPane = Tabs.TabPane;


class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0,
            isLoading: true,
            posIndex: 0,
            visible: false
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.projectID, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.listEmployee !== this.props.listEmployee) {
            var { listEmployee } = this.props
            var temp = []
            listEmployee.forEach(element => {
                var pos = { value: element.posID }
                temp.push(pos)
            });
            this.setState({ isLoading: false, positionList: temp })
        }
    }

    onSelected = (value) => {
        this.setState({ posIndex: value })
    }

    onAddMorePosition = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('dateCreate', this.props.dateBegin)
        localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
        this.props.addMorePosition(this.state.positionList)
    }

    showPositionTabs = () => {
        var { listEmployee } = this.props;
        var result = listEmployee.map((item, index) => {
            return (
                <React.Fragment>
                    <TabPane
                        tab={
                            <>
                                <Tooltip title={this.props.status !== 4 && item.isMissEmp ? 'This position is missing employees' : ''} >
                                    <span>{(item || {}).posName} </span>
                                    {this.props.status !== 4 && item.isMissEmp ? (
                                        <InfoCircleTwoTone twoToneColor="#FF0000"
                                            style={{ fontSize: "16px" }} />
                                    ) : ("")}
                                </Tooltip>
                            </>
                        }
                        key={index}
                    ></TabPane>
                </React.Fragment>
            )
        });
        return result;
    };

    onAddMoreCandidates = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('dateCreate', this.props.dateBegin)
        localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
        this.props.addMoreCandidate(this.props.listEmployee[this.state.posIndex].posID)
    }

    render() {
        var { listEmployee } = this.props
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div> :
                    listEmployee.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No position available for this project</h4>
                        </div>
                        :
                        <>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <Tabs defaultActiveKey='0' onChange={this.onSelected}>
                                        {this.showPositionTabs()}
                                    </Tabs>
                                </div>
                                <div class="card-body">
                                    <ListRequirement item={listEmployee[this.state.posIndex]}
                                        projectID={this.props.projectID}
                                        projectType={this.props.projectType}
                                        projectField={this.props.projectField}
                                        projectStatus={this.props.status}
                                        projectName={this.props.projectName}
                                        dateBegin={this.props.dateBegin}
                                        dateEstimatedEnd={this.props.dateEstimatedEnd}
                                    />
                                    {getRole() === 'PM' ?
                                        this.state.isLoading || this.props.status === 4 || listEmployee[this.state.posIndex].isMissEmp ? '' :
                                            <AddMoreRequirementModal
                                                position={listEmployee[this.state.posIndex].posName}
                                                posID={this.props.listEmployee[this.state.posIndex].posID}
                                                requirements={listEmployee[this.state.posIndex].requirements}
                                                projectID={this.props.projectID}
                                                projectType={this.props.projectType}
                                                projectField={this.props.projectField}
                                                projectName={this.props.projectName}
                                                dateBegin={this.props.dateBegin}
                                                dateEstimatedEnd={this.props.dateEstimatedEnd} />
                                        : ''}
                                </div>
                            </div>
                            {getRole() === 'PM' ?
                                this.state.isLoading || this.props.status === 4 ? '' :
                                    <button type="submit" className="btn btn-primary pull-right" style={{ marginRight: '35px' }} onClick={this.onAddMorePosition} >
                                        Add More Position
                                </button>
                                : ''
                            }
                        </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listEmployee: state.ListEmployeeReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchListEmployee: (projectID, page) => {
            dispatch(Action.fetchListEmployee(projectID, page))
        },
        addMorePosition: (position) => {
            dispatch(addMorePosition(position))
        },
        addMoreCandidate: (posID) => {
            dispatch(addMoreCandidate(posID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);