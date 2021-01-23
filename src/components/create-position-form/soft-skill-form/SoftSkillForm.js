import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSoftSkilRequire, deleteSoftSkillRequire } from '../../../store/store-action/SoftSkillActions';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {
    
    onAdd = () => {
        var { items } = this.props
        items.push("")
        this.props.onAddSoftSkill(items)
    }

    onDelete = (id) => {
        this.props.onDelete(id)
    }

    showItems = (items) => {
        var result = null;
        result = items.map((item, index) => {
            return (
                <SoftSkillFormContent key={index} onDelete={this.onDelete} index={index} />
            );
        })
        return result;
    }

    render() {
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <h5 className="font-weight-bold">Soft Skill</h5>
                </div>
                <div className="card-body">
                    {this.showItems(this.props.items)}
                    <span className="material-icons add" onClick={this.onAdd}>add_box</span>
                </div>
            </div>

        );
    }
}

const mapStateToProp = (state) => {
    return {
        items: state.SoftSkillReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddSoftSkill: (skill) => {
            dispatch(addSoftSkilRequire(skill))
        },
        onDelete: (index) => {
            dispatch(deleteSoftSkillRequire(index))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SoftSkillForm);