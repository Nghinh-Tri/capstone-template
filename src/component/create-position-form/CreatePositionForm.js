import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { convertPositionList, getPositionName } from "../../service/util/util";
import SelectBar from '../select-search/SelectBar';
import Modal from 'antd/lib/modal/Modal';
import LanguageForm from './language-form/LanguageForm';
import HardSkillForm from './hard-skill-form/HardSkillForm';
import SoftSkillForm from './soft-skill-form/SoftSkillForm';
import { store } from 'react-notifications-component';

class CreatePositionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            visible: false,
            candidateNeed: 1
        }
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePositionForm(positionFormIndex)
    }

    onShowRequireDetail = () => {
        if (this.props.positionItem.posID !== 0)
            this.setState({ visible: true })
        else
            store.addNotification({
                message: "Please select position",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
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
        var { name, value } = e.target
        if (value <= 0) {
            store.addNotification({
                message: "Candidate must bigger than 0",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
        } else
            this.props.onUpdateCandidatesNeeds(value, this.props.positionFormIndex)
    }

    render() {
        var { positionItem, positionList, positionFormIndex, length } = this.props
        var listConverted = convertPositionList(positionList)
        // console.log('positionItem', positionItem)
        return (
            <React.Fragment>
                <tr>
                    <td width={50} className='text-center'>{positionFormIndex + 1}</td>
                    <td style={{ width: 'auto' }}>
                        <SelectBar name="positionID"
                            width={200}
                            type='unique'
                            placeholder='Select position'
                            list={listConverted}
                            onUpdatePositionID={this.props.onUpdatePositionID}
                            positionFormIndex={positionFormIndex}
                            value={positionItem.posID}
                        />
                    </td>
                    <td width={145}>
                        <input className="text-center" type="number" min={1} value={positionItem.candidateNeeded} className="form-control" style={{ height: 30, width: 120 }} name="candidateNeed" onChange={this.onHandle} />
                    </td>
                    <td className='text-center'>{typeof positionItem.hardSkills.find(e => e.hardSkillID === 0) === 'object' ? positionItem.hardSkills.length - 1 : positionItem.hardSkills.length} </td>
                    <td className='text-center'>{typeof positionItem.language.find(e => e.langID === 0) === 'object' ? positionItem.language.length - 1 : positionItem.language.length}</td>
                    <td className='text-center'>{positionItem.softSkillIDs.length}</td>
                    <td width={100} className='text-center'>
                        <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                        <Modal width={1070} title={getPositionName(positionList, positionItem.posID)} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
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

export default CreatePositionForm;