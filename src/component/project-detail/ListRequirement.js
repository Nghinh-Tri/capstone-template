import { Button, Modal, Tabs, Tooltip } from 'antd';
import React, { Component } from 'react';
import { InfoCircleTwoTone } from "@ant-design/icons";
import ListEmployeeContent from './ListEmployeeContent';
import { selectRequirement } from '../../service/action/tab-select/EmployeeListRequirementAction';
import { connect } from 'react-redux';
import PositionRequireDetail from './PositionRequireDetail';
const TabPane = Tabs.TabPane

class ListRequirement extends Component {

    state = { visible: false }

    componentDidMount = () => {
        this.props.selectRequire("0")
    }

    componentDidUpdate = (nextProps) => {
        if (nextProps.item !== this.props.item) {
            this.props.selectRequire("0")
            this.setState({ isLoad: false })
        }
    }

    getTabName = () => {
        var { item } = this.props;
        var result = item.requirements.map((require, index) => {
            return (
                <TabPane
                    tab={
                        <>
                            <Tooltip title={this.props.projectStatus !== 4 && require.missingEmployee !== 0 ? 'This requirement is missing employees' : ''} >
                                <span>Require {index + 1} </span>
                                {this.props.projectStatus !== 4 && require.missingEmployee ? (
                                    <InfoCircleTwoTone twoToneColor="#FF0000"
                                        style={{ fontSize: "16px" }} />
                                ) : ("")}
                            </Tooltip>
                        </>
                    }
                    key=
                    {`${index.toString()}`}
                ></TabPane>
            )
        });
        return result;
    };

    onSelectPos = (value) => {
        this.props.selectRequire(value)
    }

    groupEmployee = () => {
        var result = {}
        let employees = this.props.item.requirements[parseInt(this.props.selection)].employees
        let group = -1
        employees.map((emp, key) => {
            if (!emp.requirementDate) return
            if (!result[emp.requirementDate]) {
                group++
                result[emp.requirementDate] = [{ empID: emp.empID, group: group }]
            }
            else
                result[emp.requirementDate].push({ empID: emp.empID, group: group })
        })
        return result
    }

    render() {
        var { item, selection } = this.props
        return (
            <React.Fragment>
                <div className="card mb-4" style={item.requirements.length === 1 ? { border: 'none' } : {}} >
                    {item.requirements.length > 1 ?
                        <div className="card-header">
                            <Tabs defaultActiveKey="0" activeKey={parseInt(selection) + ""} onChange={this.onSelectPos}>
                                {this.getTabName()}
                            </Tabs>
                        </div>
                        : ''}
                    {typeof item.requirements[parseInt(selection)] !== 'undefined' ?
                        <div className="card-body">
                            <Button type='link' onClick={() => this.setState({ visible: true })}>Requirement Details</Button>
                            <Modal width={1000} title='Requirement Details'
                                visible={this.state.visible} footer={null}
                                onCancel={() => this.setState({ visible: false })} >
                                <PositionRequireDetail hardSkills={item.requirements[parseInt(selection)].hardSkills}
                                    language={item.requirements[parseInt(selection)].language}
                                    softSkills={item.requirements[parseInt(selection)].softSkillIDs} />
                            </Modal>
                            <ListEmployeeContent item={item.requirements[parseInt(selection)]}
                                projectID={this.props.projectID}
                                projectType={this.props.projectType}
                                projectField={this.props.projectField}
                                projectStatus={this.props.projectStatus}
                                projectName={this.props.projectName}
                                dateBegin={this.props.dateBegin}
                                dateEstimatedEnd={this.props.dateEstimatedEnd}
                                groupEmployee={this.groupEmployee()}
                            />
                        </div>
                        : ''}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selection: state.EmployeeListRequirementReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        selectRequire: value => {
            dispatch(selectRequirement(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListRequirement)