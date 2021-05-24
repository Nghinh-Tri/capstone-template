import { Button, Modal, Tabs } from 'antd';
import React, { Component } from 'react';
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
            console.log('fasle')
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

    render() {
        var { requirements, position } = this.props
        return (
            <React.Fragment>
                <button type="submit" className="btn btn-primary pull-right" onClick={this.onShowRequirement} >
                    Add More Requirement
                </button>
                {this.state.requireAvailable ?
                    <Modal width={1000}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={<>
                            <Button type='default' style={{ width: 50 }} >No</Button>
                            <Button type='primary' style={{ width: 50 }} >Yes</Button>
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

export default AddMoreRequirementModal;