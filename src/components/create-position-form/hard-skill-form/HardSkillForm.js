import React, { Component } from 'react';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkill(positionFormIndex)
    }

    showItems = (hardSkill, positionFormIndex) => {
        var result = null;
        result = hardSkill.map((item, hardSkillIndex) => {
            return (
                <HardSkillFormContent key={hardSkillIndex}
                    hardSkillIndex={hardSkillIndex}
                    positionFormIndex={positionFormIndex}
                    onDeleteHardSkill={this.props.onDeleteHardSkill} />
            );
        })
        return result;
    }

    render() {
        var { hardSkill, positionFormIndex } = this.props
        return (
            <div className="card">
                <div className="card-header ">
                    <h5 className="font-weight-bold">Hard Skill</h5>
                </div>
                <div className="card-body">
                    {this.showItems(hardSkill, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddHardSkill(positionFormIndex)}>add_box</span>
                </div>
            </div>

        );
    }
}

export default HardSkillForm;