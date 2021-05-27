import { Button, Modal, Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMoreCandidate, copyRequirement } from '../../service/action/position/PositionAction';
import PositionRequireDetail from './PositionRequireDetail';
const TabPane = Tabs.TabPane

class AddMoreRequirementModal extends Component {

    state = { visible: false, select: "1", requireAvailable: false }

    componentDidMount = () => {
        let array = []
        let { requirements } = this.props
        for (let index = 0; index < requirements.length; index++) {
            if (requirements[index].missingEmployee === 0) {
                array.push(index)
            }
        }
        this.setState({ select: array.length > 0 ? array[0].toString() : "1", requireAvailable: array.length > 0 })
    }

    componentDidUpdate = (nextProps) => {
        if (nextProps.requirements !== this.props.requirements) {
            let array = []
            let { requirements } = this.props
            for (let index = 0; index < requirements.length; index++) {
                if (requirements[index].missingEmployee === 0) {
                    array.push(index)
                }
            }
            this.setState({ select: array.length > 0 ? array[0].toString() : "1", requireAvailable: array.length > 0 })
        }
    }

    onShowRequirement = () => {
        if (this.state.requireAvailable)
            this.setState({ visible: true })
        else
            Modal.confirm({
                title: 'There is currently no requirement you can copy. Do you want to create a new requirement?',
                onOk: () => {
                    this.createNewRequirement()
                }
            })
    }

    handleCancel = (e) => {
        this.setState({ visible: false });
    }

    showRequirementTab = () => {
        var { requirements } = this.props;
        let count = 0
        var result = requirements.map((require, index) => {
            if (require.missingEmployee === 0) {
                count++
                return (
                    <TabPane tab={`Require ${count}`} key={index.toString()}></TabPane>
                )
            }
        });
        return result;
    }

    onSelectPos = (value) => {
        this.setState({ select: value })
    }

    copyRequirement = () => {
        var { requirements } = this.props
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('dateCreate', this.props.dateBegin)
        localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
        this.props.copyRequirement(this.props.posID,
            requirements[this.state.select].hardSkills,
            requirements[this.state.select].language,
            requirements[this.state.select].softSkillIDs)
    }

    createNewRequirement = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('dateCreate', this.props.dateBegin)
        localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
        this.props.addMoreCandidate(this.props.posID)
    }

    render() {
        var { requirements, position } = this.props
        return (
            <React.Fragment>
                <button type="submit" className="btn btn-primary pull-right mr-3" onClick={this.onShowRequirement} >
                    New Requirement
                </button>
                {this.state.requireAvailable ?
                    <Modal width={1000}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={<>
                            <Button type='default' style={{ width: 50 }} onClick={this.createNewRequirement} >No</Button>
                            <Button type='primary' style={{ width: 50 }} onClick={this.copyRequirement} >Yes</Button>
                        </>
                        }
                        title={
                            <span style={{ color: 'red', fontWeight: 600 }} >
                                Do you want to reuse a previous requirement that you've created for {position}?
                        </span>
                        }>
                        <Tabs defaultActiveKey="1" activeKey={parseInt(this.state.select) + ""} onChange={this.onSelectPos} >
                            {this.showRequirementTab()}
                        </Tabs>
                        {typeof requirements[this.state.select] !== 'undefined' ?
                            <div className="card-body">
                                <PositionRequireDetail hardSkills={requirements[this.state.select].hardSkills}
                                    language={requirements[this.state.select].language}
                                    softSkills={requirements[this.state.select].softSkillIDs} />
                            </div>
                            : ''}
                    </Modal>
                    :
                    ''}
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        addMoreCandidate: (posID) => {
            dispatch(addMoreCandidate(posID))
        },
        copyRequirement: (postID, hardSkill, language, softskill) => {
            dispatch(copyRequirement(postID, hardSkill, language, softskill))
        }
    }
}

export default connect(null, mapDispatchToProp)(AddMoreRequirementModal);