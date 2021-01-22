import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHardSkilRequire, deleteHardSkillRequire } from "../../../store/store-action/HardSkillAction";
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    onAdd = () => {
        var { items } = this.props
        items.push("")
        this.props.onAddHardSkill(items)
    }

    onDelete = (id) => {
        this.props.onDelete(id)
    }

    showItems = (items) => {
        var result = null;
        result = items.map((item, index) => {
            return (
                <HardSkillFormContent key={index} onDelete={this.onDelete} index={index} />
            );
        })
        return result;
    }

    render() {
        return (
            <div class="card">
                <div className="card-header card-header-primary ">
                    <h5 className="font-weight-bold">Hard Skill</h5>
                </div>
                <div class="card-body">
                    {this.showItems(this.props.items)}
                    <span className="material-icons add" onClick={this.onAdd}>add_box</span>
                </div>
            </div>

        );
    }
}

const mapStateToProp = (state) => {
    return {
        items: state.HardSkillReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddHardSkill: (skill) => {
            dispatch(addHardSkilRequire(skill))
        },
        onDelete: (index) => {
            dispatch(deleteHardSkillRequire(index))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(HardSkillForm);