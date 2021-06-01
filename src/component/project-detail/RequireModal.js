import { Modal, Tabs } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { showRequestStatus } from '../../service/util/util';
import CandidateResult from './CandidateResult';
import PositionRequireDetail from './PositionRequireDetail';
import RequireModalDetail from './RequireModalDetail';
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
                <td className='text-center'>{moment(value.dateCreated).format('DD-MM-YYYY HH:mm:ss')}</td>
                <td className='text-center'>{showRequestStatus(value.status)}</td>
                <td className='text-center'>
                    <RequireModalDetail value={value} />
                </td>
            </tr>
        );
    }
}

export default RequireModal;