import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import CreatePositionForm from '../../component/create-position-form/CreatePositionForm';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from "../../service/action/PositionAction";
import { fetchPostionList } from '../../service/action/PositionSelectBarAction';


class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requiredPositions: {
                posID: 0,
                posLevel: [],//posLevel:0
                language: [],
                softSkillIDs: [],
                hardSkills: []
            },
            isUpdate: false
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        if (typeof this.props.location.state !== 'undefined')
            this.setState({ isUpdate: this.props.location.state.isUpdate })
        if (localStorage.getItem('projectId') === '0' || localStorage.getItem('projectId') === null) {
            this.props.history.push('/project')
        } else
            this.props.fetchPostionList()
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

    onSelectPosLevel = (value, positionFormIndex) => {
        this.props.onSelectPosLevel(value, positionFormIndex)
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

    onUpdateSkillLevel = (value, hardSkillIndex, positionFormIndex) => {
        this.props.onUpdateSkillLevel(hardSkillIndex, positionFormIndex, value)
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
        this.props.onCreatePosition(this.props.items, this.state.isUpdate)
    }

    getPositionListNotSelect = () => {
        var { positionList, items } = this.props
        var listNotSelect = positionList.slice(0, positionList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < items.length; k++) {
                if (listNotSelect[i].posID === items[k].posID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    //For render
    showItems = (items) => {
        var positionList = this.getPositionListNotSelect()
        var result = null;
        result = items.map((item, positionFormIndex) => {
            return (
                <CreatePositionForm
                    key={positionFormIndex}
                    positionFormIndex={positionFormIndex}
                    positionList={positionList}
                    item={item} //position object
                    //position
                    onDeletePositionForm={this.onDeletePositionForm}
                    onUpdatePositionID={this.onUpdatePositionID}
                    onSelectPosLevel={this.onSelectPosLevel}
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
                    onUpdateSkillLevel={this.onUpdateSkillLevel}
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
                    <div className="row">
                        {this.props.positionList.length === this.props.items.length ?
                            '' :
                            <div className="col">
                                <button type="button" className="btn btn-primary" style={{ fontWeight: 700, borderRadius: 60, marginLeft: 10, background: '#31DF44' }} onClick={this.onAddPosition}>
                                    <i className="material-icons mr-5">add_box</i>More Position
                                </button>
                            </div>
                        }
                        <div className='col' >
                            <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700 }}>Create Position</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        items: state.PositionFormReducer,
        positionList: state.PositionSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onAddPosition: (positionItem) => {
            dispatch(Action.addPositionRequire(positionItem))
        },
        onDeletePosition: (positionFormIndex) => {
            dispatch(Action.deletePositionRequire(positionFormIndex))
        },
        onUpdatePositionID: (positionID, positionFormIndex) => {
            dispatch(Action.updatePositionID(positionID, positionFormIndex))
        },
        onSelectPosLevel: (value, positionFormIndex) => {
            dispatch(Action.selectPosLevel(value, positionFormIndex))
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
        onUpdateSkillLevel: (hardSkillIndex, positionFormIndex, value) => {
            dispatch(Action.updateHardSkillLevel(hardSkillIndex, positionFormIndex, value))
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
        onCreatePosition: (positionItem, isUpdate) => {
            dispatch(Action.createPosition(positionItem, isUpdate))
        },
        fetchPostionList: () => {
            dispatch(fetchPostionList())
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(CreatePosition);