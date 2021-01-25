import React, { Component } from 'react';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {

    onAddSoftSkill = (positionFormIndex) => {
        this.props.onAddSoftSkill(positionFormIndex)
    }

    showItems = (softSkill, positionFormIndex) => {
        var result = null;
        result = softSkill.map((item, softSkillIndex) => {
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
        var { softSkill, positionFormIndex } = this.props
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <h5 className="font-weight-bold">Soft Skill</h5>
                </div>
                <div className="card-body">
                    {this.showItems(softSkill, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddSoftSkill(positionFormIndex)}>add_box</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillForm;