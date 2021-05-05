import { Modal, Tabs } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { showRequestStatus } from '../../service/util/util';
import CandidateResult from './CandidateResult';
import PositionRequireDetail from './PositionRequireDetail';
const TabPane = Tabs.TabPane;

class RequireModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onShowRequireDetail = () => {
        this.setState({ visible: true })
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        var { value, index } = this.props
        return (
            <tr>
                <td className='text-center'>{index + 1} </td>
                <td>{value.posName}</td>
                <td className='text-center'>{value.candidateNeeded}</td>
                <td className='text-center'>{value.missingEmployee}</td>
                <td className='text-center'>{value.hardSkills.length}</td>
                <td className='text-center'>{value.language.length}</td>
                <td className='text-center'>{value.softSkillIDs.length}</td>
                <td className='text-center'>{moment(value.dateCreated).format('DD-MM-YYYY')}</td>
                <td className='text-center'>{showRequestStatus(value.status)}</td>
                <td className='text-center'>
                    <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                    <Modal width={1000} title={value.posName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Tabs defaultActiveKey={1}>
                        <TabPane key={1} tab="Details">
                            <PositionRequireDetail hardSkills={value.hardSkills} language={value.language} softSkills={value.softSkillIDs} />
                        </TabPane>
                        <TabPane key={2} tab="Candidates">
                            <CandidateResult requireID={value.requiredPosID} />
                        </TabPane>
                        </Tabs>
                    </Modal>
                </td>
            </tr>
        );
    }
}

export default RequireModal;