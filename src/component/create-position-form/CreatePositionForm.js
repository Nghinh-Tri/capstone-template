import React, { Component } from 'react';
import { convertPositionList, getPositionName } from "../../service/util/util";
import SelectBar from '../select-search/SelectBar';
import Modal from 'antd/lib/modal/Modal';
import LanguageForm from './language-form/LanguageForm';
import HardSkillForm from './hard-skill-form/HardSkillForm';
import SoftSkillForm from './soft-skill-form/SoftSkillForm';
import { createPositionFailed } from '../../service/action/position/PositionAction';
import { connect } from 'react-redux';

class CreatePositionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            visible: false,
            candidateNeed: 1
        }
    }

    onDeletePositionForm = () => {
        this.props.onDeletePositionForm(this.props.positionFormIndex)
    }

    onShowRequireDetail = () => {
        if (this.props.positionItem.posID !== 0) {
            this.setState({ visible: true })
            this.props.addError({ RequiredPositions: [] })
        }
        else
            this.props.addError({ RequiredPositions: ['Please select position'] })
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

    onHandleUpdateNOC = (event) => {
        var { positionFormIndex } = this.props
        var value = event.target.value
        this.props.onUpdateNOC(value, positionFormIndex)
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    onHandle = (e) => {
        var { value } = e.target
        if (value > 0 && value <= 100)
            this.props.onUpdateCandidatesNeeds(value, this.props.positionFormIndex)
    }

    render() {
        var { positionItem, positionList, positionFormIndex, length } = this.props
        var listConverted = convertPositionList(positionList)
        return (
            <React.Fragment>
                <tr>
                    <td width={50} className='text-center'>{positionFormIndex + 1}</td>
                    <td style={{ width: 'auto' }}>
                        <SelectBar name="positionID"
                            width={200}
                            type='unique'
                            isDelete={this.props.updateType !== 'copyRequirement' && this.props.updateType !== 'addMoreCandidate'}
                            placeholder='Select position'
                            list={listConverted}
                            onUpdatePositionID={this.props.onUpdatePositionID}
                            positionFormIndex={positionFormIndex}
                            value={positionItem.posID}
                        />
                    </td>
                    <td width={145}>
                        <input className="text-center" min={1} max={100} type="number" value={positionItem.candidateNeeded} className="form-control" style={{ height: 30, width: 120 }} name="candidateNeed" onChange={this.onHandle} />
                    </td>
                    <td className='text-center'>{typeof positionItem.hardSkills.option.find(e => e.hardSkillID === 0) === 'object' ? positionItem.hardSkills.minium.length + positionItem.hardSkills.option.length - 1 : positionItem.hardSkills.minium.length + positionItem.hardSkills.option.length} </td>
                    <td className='text-center'>{typeof positionItem.language.find(e => e.langID === 0) === 'object' ? positionItem.language.length - 1 : positionItem.language.length}</td>
                    <td className='text-center'>{positionItem.softSkillIDs.option.length + positionItem.softSkillIDs.minium.length}</td>
                    <td width={100} className='text-center'>
                        <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                        <Modal footer={null} width={1070} title={this.props.projectName + ' - ' + getPositionName(positionList, positionItem.posID)}
                            visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            <HardSkillForm
                                hardSkill={positionItem.hardSkills}
                                positionFormIndex={positionFormIndex}
                                onAddHardSkill={this.props.onAddHardSkill}
                                onDeleteHardSkill={this.props.onDeleteHardSkill}
                                onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                                onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                                onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                                onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                            />
                            <LanguageForm
                                language={positionItem.language}
                                positionFormIndex={positionFormIndex}
                                onAddLanguage={this.props.onAddLanguage}
                                onDeleteLanguage={this.props.onDeleteLanguage}
                                onUpdateLanguageID={this.props.onUpdateLanguageID}
                                onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                            />
                            <SoftSkillForm
                                softSkill={positionItem.softSkillIDs}
                                positionFormIndex={positionFormIndex}
                                onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                            />
                        </Modal>
                    </td>
                    <td className='text-center'>
                        {length > 1 ?
                            <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onDeletePositionForm()}>clear</span>
                            : ''
                        }
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        addError: (error) => {
            dispatch(createPositionFailed(error))
        }
    }
}

export default connect(null, mapDispatchToProp)(CreatePositionForm);