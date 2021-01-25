import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSoftSkilRequire, deleteSoftSkillRequire } from '../../../store/store-action/SoftSkillActions';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {

    onAddSoftSkill = () => {
        var { positionFormIndex } = this.props
        this.props.onAddSoftSkill(positionFormIndex)
    }

    showItems = (items) => {
        var result = null;
        var { positionFormIndex } = this.props
        result = items.map((item, softSkillIndex) => {
            return (
                <SoftSkillFormContent key={softSkillIndex}
                    positionFormIndex={positionFormIndex}
                    softSkillIndex={softSkillIndex}
                    onDeleteSoftSkill={this.props.onDeleteSoftSkill} />
            );
        })
        return result;
    }

    render() {
        var { softSkill } = this.props
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <h5 className="font-weight-bold">Soft Skill</h5>
                </div>
                <div className="card-body">
                    {this.showItems(softSkill)}
                    <span className="material-icons add" onClick={this.onAddSoftSkill}>add_box</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillForm;