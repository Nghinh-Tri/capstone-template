import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import CreatePositionForm from '../../component/create-position-form/CreatePositionForm';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SelectBar from '../../component/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from "../../service/action/PositionAction";
import { fetchPostionList } from '../../service/action/PositionSelectBarAction';
import { convertPositionList, convertPositionRequire } from '../../service/util/util';

class PositionRequire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requiredPositions: {
                posID: 0,
                candidateNeeded: 1,
                language: [{
                    langID: 0,
                    priority: 10
                }],
                softSkillIDs: [],
                hardSkills: []
            },
            isUpdate: false,
            updateType: '',
            positionNotSelect: []
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPostionList()
        var { location } = this.props
        if (typeof location.state !== 'undefined') {
            this.setState({ updateType: location.state.type })
            if (location.state.type === 'addMorePosition') {
                this.setState({ positionNotSelect: location.state.position })
            }
        }
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePosition(positionFormIndex)
    }

    onUpdatePositionID = (positionID, positionFormIndex) => {
        this.props.onUpdatePositionID(positionID, positionFormIndex)
    }

    onUpdateCandidateNeeds = (value, positionFormIndex) => {
        this.props.onUpdateCandidateNeeds(value, positionFormIndex)
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
    onUpdateSoftSkillID = (value, positionFormIndex) => {
        this.props.onUpdateSoftSkillID(value, positionFormIndex)
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

    getPositionListNotSelect = () => {
        var { positionList, items } = this.props
        if (this.state.updateType === 'addMorePosition') {
            var remove = this.state.positionNotSelect
            for (let i = 0; i < positionList.length; i++) {
                for (let k = 0; k < remove.length; k++) {
                    if (positionList[i].posID === remove[k].value)
                        positionList.splice(i, 1)
                }
            }
        }
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

    showPosition = (items) => {
        var positionList = this.getPositionListNotSelect()
        var result = null
        result = items.map((positionItem, index) => {
            return (<CreatePositionForm length={items.length} key={index}
                positionItem={positionItem}
                positionIndex={index}
                positionList={positionList}
                positionFormIndex={index}

                onDeletePositionForm={this.onDeletePositionForm}
                onUpdatePositionID={this.onUpdatePositionID}
                onUpdateCandidatesNeeds={this.onUpdateCandidateNeeds}

                onAddLanguage={this.onAddLanguage}
                onDeleteLanguage={this.onDeleteLanguage}
                onUpdateLanguageID={this.onUpdateLanguageID}
                onUpdateLanguagePriority={this.onUpdateLanguagePriority}

                onAddHardSkill={this.onAddHardSkill}
                onDeleteHardSkill={this.onDeleteHardSkill}
                onUpdateSkillLevel={this.onUpdateSkillLevel}
                onUpdateHardSkillPriority={this.onUpdateHardSkillPriority}
                onUpdateHardSkillID={this.onUpdateHardSkillID}
                onUpdateHardSkillCerti={this.onUpdateHardSkillCerti}

                onUpdateSoftSkillID={this.onUpdateSoftSkillID}
            />)
        })
        return result
    }

    onAddPosition = () => {
        this.props.onAddPosition(this.state.requiredPositions)
    }

    onCreatePosition = (event) => {
        event.preventDefault()
        var items = convertPositionRequire(this.props.items)
        this.props.onCreatePosition(items, this.state.isUpdate)
    }

    render() {
        var { items } = this.props
        // console.log('items', items)
        return (
            <React.Fragment>
                <ProgressBar current='1' />
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>
                    Position
                </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th width={100} className="text-center" >Position</th>
                                        <th width={145}>Candidates Needs</th>
                                        <th width={200} className='text-center'>Hard Skill Requirements</th>
                                        <th width={200} className='text-center'>Language Requirements</th>
                                        <th width={190} className='text-center'>Soft Skill Requirements</th>
                                        <th width={100}></th>
                                        <th width={100}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showPosition(items)}
                                </tbody>
                            </table>
                            {this.props.positionList.length === this.props.items.length || this.state.updateType === 'addMoreCandidate' ?//if state is not undefined then it add more candidate
                                '' :
                                <div className="col">
                                    <i className="material-icons" style={{ cursor: 'pointer', color: 'blue' }} onClick={this.onAddPosition}>add_box</i>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='col' >
                    <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700 }} onClick={this.onCreatePosition} >Require Position</button>
                </div>
            </React.Fragment>
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
        onUpdateCandidateNeeds: (value, positionFormIndex) => {
            dispatch(Action.updateCandidateNeeds(value, positionFormIndex))
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
        onUpdateSoftSkillID: (value, positionFormIndex) => {
            dispatch(Action.updateSoftSkillID(value, positionFormIndex))
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

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(PositionRequire);