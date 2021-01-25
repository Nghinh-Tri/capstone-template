import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePositionForm from '../../components/create-position-form/CreatePositionForm';
import * as Action from "../../store/store-action/PositionAction";


class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                id: 0,
                name: "",
                nOC: 0,
                softSkill: [],
                hardSkill: []
            }
        }
    }

    onAddPosition = () => {
        this.setState(pre => ({
            position: {
                ...pre.position,
                id:1
            }
        }))
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


    showItems = (items) => {
        var result = null;
        result = items.map((item, positionFormIndex) => {
            // console.log(item)
            return (
                <CreatePositionForm key={positionFormIndex}
                    positionFormIndex={positionFormIndex}
                    item={item}
                    onAddSoftSkill={this.onAddSoftSkill}
                    onDeletePositionForm={this.onDeletePositionForm}
                    onDeleteSoftSkill={this.onDeleteSoftSkill}
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
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(CreatePosition);