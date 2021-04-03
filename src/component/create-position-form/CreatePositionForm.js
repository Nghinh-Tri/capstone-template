import React, { Component } from 'react';
import HardSkillForm from './hard-skill-form/HardSkillForm';
import SoftSkillForm from './soft-skill-form/SoftSkillForm';
import { convertPositionList } from "../../service/util/util";
import LanguageForm from './language-form/LanguageForm';
import SelectBar from './select-search/SelectBar';

class CreatePositionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            posLevel: [
                { label: 'Intern', value: 1 },
                { label: 'Fresher', value: 2 },
                { label: 'Junior', value: 3 },
                { label: 'Senior', value: 4 },
                { label: 'Master', value: 5 },
            ]
        }
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePositionForm(positionFormIndex)
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

    render() {
        var { item, positionFormIndex, positionList } = this.props
        var listConverted = convertPositionList(positionList)
        const showSkill = () => {
            if (this.state.isMinimize)
                return ""
            else
                return (
                    <React.Fragment>
                        <LanguageForm language={item.language}
                            positionFormIndex={positionFormIndex}
                            onAddLanguage={this.props.onAddLanguage}
                            onDeleteLanguage={this.props.onDeleteLanguage}
                            onUpdateLanguageID={this.props.onUpdateLanguageID}
                            onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                        />
                        <SoftSkillForm softSkill={item.softSkillIDs}
                            positionFormIndex={positionFormIndex}
                            onAddSoftSkill={this.props.onAddSoftSkill}
                            onDeleteSoftSkill={this.props.onDeleteSoftSkill}
                            onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        />
                        <HardSkillForm hardSkill={item.hardSkills}
                            positionFormIndex={positionFormIndex}
                            onAddHardSkill={this.props.onAddHardSkill}
                            onDeleteHardSkill={this.props.onDeleteHardSkill}
                            onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                            onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                            onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                            onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                        />
                    </React.Fragment>
                )
        }
        return (
            <div className="card mb-50" style={{ marginRight: 20 }}>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">

                            {/* Position */}
                            <div className="col-1" style={{ marginLeft: 20, marginTop: 10, }}>
                                <label className="bmd-label  ">
                                    <h4 className="font-weight-bold">
                                        Position
                                </h4>
                                </label>
                            </div>

                            {/* Select Bar */}
                            <div className="col" style={{ marginLeft: 20, marginTop: 5 }}>
                                <SelectBar name="positionID"
                                    type='unique'
                                    placeholder='Select position'
                                    list={listConverted}
                                    onUpdatePositionID={this.props.onUpdatePositionID}
                                    positionFormIndex={positionFormIndex}
                                    value={item.posID}
                                />
                            </div>

                            {/* Position Level */}
                            <div className="col-auto" style={{ marginLeft: 20, marginTop: 10, }}>
                                <label className="bmd-label ">
                                    <h4 className="font-weight-bold ">
                                        Position Level
                                    </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 20, marginTop: 5 }}>
                                <SelectBar name="posLevel"
                                    type="multi"
                                    placeholder="Select skill level"
                                    list={this.state.posLevel}
                                    onSelectPosLevel={this.props.onSelectPosLevel}
                                    positionFormIndex={positionFormIndex}
                                    value={item.posLevel}
                                />
                            </div>

                            {/* Button Add and Minimize */}
                            <div className="col">
                                <span className="material-icons pull-right clear" onClick={() => this.onDeletePositionForm(positionFormIndex)}>clear</span>
                                <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                            </div>
                        </div>

                        {showSkill()}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePositionForm;