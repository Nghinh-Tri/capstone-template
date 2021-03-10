import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePositionForm from '../../component/create-position-form/CreatePositionForm';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import * as Action from "../../service/action/PositionAction";


class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requiredPositions: {
                posID: "",
                numberOfCandidates: 0,
                language: [],
                softSkillIDs: [],
                hardSkills: []
            }
        }
    }

    // Position
    onAddPosition = () => {
        this.props.onAddPosition(this.state.requiredPositions)
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePosition(positionFormIndex)
    }

    onUpdatePositionID = (positionID, positionFormIndex) => {
        this.props.onUpdatePositionID(positionID, positionFormIndex)
    }

    onUpdateNOC = (nOC, positionFormIndex) => {
        this.props.onUpdateNOC(nOC, positionFormIndex)
    }

    //Language
    onAddLanguage = (positionFormIndex, languageItem) => {
        this.props.onAddLanguage(positionFormIndex, languageItem)
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguageItem(languageIndex, positionFormIndex)
    }

    onUpdateLanguageID = (value, langugageIndex, positionFormIndex) => {
        this.props.onUpdateLanguageID(value, langugageIndex, positionFormIndex)
    }

    onUpdateLanguagePriority = (value, languageIndex, positionFormIndex) => {
        this.props.onUpdateLanguagePriority(value, languageIndex, positionFormIndex)
    }

    // Soft Skill
    onAddSoftSkill = (positionFormIndex) => {
        this.props.onAddSoftSkillItem(positionFormIndex)
    }

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkillItem(softSkillIndex, positionFormIndex)
    }

    onUpdateSoftSkillID = (value, softSkillIndex, positionFormIndex) => {
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    // Hard Skill
    onAddHardSkill = (positionFormIndex, hardSkillItem) => {
        this.props.onAddHardSkillItem(positionFormIndex, hardSkillItem)
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkillItem(hardSkillIndex, positionFormIndex)
    }

    updateHardSkillExp = (hardSkillIndex, positionFormIndex, value, name) => {
        this.props.updateHardSkillExp(hardSkillIndex, positionFormIndex, value, name)
    }

    onUpdateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onUpdateHardSkillCerti = (value, hardSkillIndex, positionFormIndex) => {
        this.props.onUpdateHardSkillCerti(value, hardSkillIndex, positionFormIndex)
    }

    onUpdateHardSkillPriority = (value, hardSkillIndex, positionFormIndex) => {
        this.props.updateHardSkillPriority(value, hardSkillIndex, positionFormIndex)
    }

    onCreatePosition = (event) => {
        event.preventDefault()
        this.props.onCreatePosition(this.props.items)
    }

    //For render
    showItems = (items) => {
        var result = null;
        result = items.map((item, positionFormIndex) => {
            return (
                <CreatePositionForm key={positionFormIndex}
                    positionFormIndex={positionFormIndex}
                    item={item} //position object
                    //position
                    onDeletePositionForm={this.onDeletePositionForm}
                    onUpdatePositionID={this.onUpdatePositionID}
                    onUpdateNOC={this.onUpdateNOC}
                    //language
                    onAddLanguage={this.onAddLanguage}
                    onDeleteLanguage={this.onDeleteLanguage}
                    onUpdateLanguageID={this.onUpdateLanguageID}
                    onUpdateLanguagePriority={this.onUpdateLanguagePriority}
                    //soft skill
                    onAddSoftSkill={this.onAddSoftSkill}
                    onDeleteSoftSkill={this.onDeleteSoftSkill}
                    onUpdateSoftSkillID={this.onUpdateSoftSkillID}
                    //hard skill
                    onAddHardSkill={this.onAddHardSkill}
                    onDeleteHardSkill={this.onDeleteHardSkill}
                    updateHardSkillExp={this.updateHardSkillExp}
                    onUpdateHardSkillID={this.onUpdateHardSkillID}
                    onUpdateHardSkillCerti={this.onUpdateHardSkillCerti}
                    onUpdateHardSkillPriority={this.onUpdateHardSkillPriority}
                />
            );
        })
        return result;
    }

    render() {
        return (
            <div>
                <ProgressBar step="step2" />
                <form onSubmit={this.onCreatePosition} >
                    {this.showItems(this.props.items)}
                    <div >
                        <button type="button" className="btn btn-primary" onClick={this.onAddPosition}>
                            <i className="material-icons mr-5">add_box</i>
                    More Position
                    </button>
                    </div>
                    <div >
                        <button type="submit" className="btn btn-primary pull-right">Create Position</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        items: state.PositionFormReducer,
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddPosition: (positionItem) => {
            dispatch(Action.addPositionRequire(positionItem))
        },
        onDeletePosition: (positionFormIndex) => {
            dispatch(Action.deletePositionRequire(positionFormIndex))
        },
        onUpdatePositionID: (positionID, positionFormIndex) => {
            dispatch(Action.updatePositionID(positionID, positionFormIndex))
        },
        onUpdateNOC: (nOC, positionFormIndex) => {
            dispatch(Action.updateNOC(nOC, positionFormIndex))
        },
        onAddLanguage: (positionFormIndex, languageItem) => {
            dispatch(Action.addLanguageRequire(positionFormIndex, languageItem))
        },
        onDeleteLanguageItem: (languageIndex, positionFormIndex) => {
            dispatch(Action.deleteLanguageRequire(languageIndex, positionFormIndex))
        },
        onUpdateLanguageID: (languageID, languageIndex, positionFormIndex) => {
            dispatch(Action.updateLanguageID(languageID, languageIndex, positionFormIndex))
        },
        onUpdateLanguagePriority: (value, languageIndex, positionFormIndex) => {
            dispatch(Action.updateLanguagePriority(value, languageIndex, positionFormIndex))
        },  
        onAddSoftSkillItem: positionFormIndex => {
            dispatch(Action.addSoftSkillRequire(positionFormIndex))
        },
        onDeleteSoftSkillItem: (softSkillIndex, positionFormIndex) => {
            dispatch(Action.deleteSoftSkillRequire(softSkillIndex, positionFormIndex))
        },
        onUpdateSoftSkillID: (softSkillID, softSkillIndex, positionFormIndex) => {
            dispatch(Action.updateSoftSkillID(softSkillID, softSkillIndex, positionFormIndex))
        },
        onAddHardSkillItem: (positionFormIndex, hardSkillItem) => {
            dispatch(Action.addHardSkillRequire(positionFormIndex, hardSkillItem))
        },
        onDeleteHardSkillItem: (hardSkillIndex, positionFormIndex) => {
            dispatch(Action.deleteHardSkillRequire(hardSkillIndex, positionFormIndex))
        },
        updateHardSkillExp: (hardSkillIndex, positionFormIndex, value, name) => {
            dispatch(Action.updateHardSkillExp(hardSkillIndex, positionFormIndex, value, name))
        },
        updateHardSkillPriority: (value, hardSkillIndex, positionFormIndex) => {
            dispatch(Action.updateHardSkillPriority(value, hardSkillIndex, positionFormIndex))
        },
        onUpdateHardSkillID: (value, hardSkillIndex, positionFormIndex) => {
            dispatch(Action.updateHardSkillID(value, hardSkillIndex, positionFormIndex))
        },
        onUpdateHardSkillCerti: (value, hardSkillIndex, positionFormIndex) => {
            dispatch(Action.updateHardSkillCerti(value, hardSkillIndex, positionFormIndex))
        },
        onCreatePosition: (positionItem) => {
            dispatch(Action.createPosition(positionItem))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(CreatePosition);