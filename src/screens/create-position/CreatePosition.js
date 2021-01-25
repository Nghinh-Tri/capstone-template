import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePositionForm from '../../components/create-position-form/CreatePositionForm';
import * as Action from "../../store/store-action/PositionAction";


class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                positionId: "",
                nOC: 0,
                softSkill: [],
                hardSkill: []
            }
        }
    }

    onAddPosition = () => {
        this.props.onAddPosition(this.state.position)
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePosition(positionFormIndex)
    }

    onAddSoftSkill = (positionFormIndex) => {
        this.props.onAddSoftSkillItem(positionFormIndex)
    }

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkillItem(softSkillIndex, positionFormIndex)
    }

    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkillItem(positionFormIndex)
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkillItem(hardSkillIndex, positionFormIndex)
    }

    showItems = (items) => {
        var result = null;
        result = items.map((item, positionFormIndex) => {
            return (
                <CreatePositionForm key={positionFormIndex}
                    positionFormIndex={positionFormIndex}
                    item={item}
                    onDeletePositionForm={this.onDeletePositionForm}
                    onAddSoftSkill={this.onAddSoftSkill}
                    onDeleteSoftSkill={this.onDeleteSoftSkill}
                    onAddHardSkill={this.onAddHardSkill}
                    onDeleteHardSkill={this.onDeleteHardSkill}
                />
            );
        })
        return result;
    }

    render() {
        return (
            <div>
                {this.showItems(this.props.items)}
                <div >
                    <button type="button" className="btn btn-primary" onClick={this.onAddPosition}>
                        <i className="material-icons mr-5">add_box</i>
                    More Position
                    </button>
                </div>
                <div >
                    <button type="submit" className="btn btn-primary pull-right">Next</button>
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => {
    return {
        items: state.PositionFormReducer
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
        onAddSoftSkillItem: positionFormIndex => {
            dispatch(Action.addSoftSkillRequire(positionFormIndex))
        },
        onDeleteSoftSkillItem: (softSkillIndex, positionFormIndex) => {
            dispatch(Action.deleteSoftSkillRequire(softSkillIndex, positionFormIndex))
        },
        onAddHardSkillItem: (positionFormIndex)=>{
            dispatch(Action.addHardSkillRequire(positionFormIndex))
        },
        onDeleteHardSkillItem: (hardSkillIndex, positionFormIndex) =>{
            dispatch(Action.deleteHardSkillRequire(hardSkillIndex,positionFormIndex))
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(CreatePosition);