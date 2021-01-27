import React, { Component } from 'react';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkillDetail: {
                hardSkillID: 0,
                exp: 0,
                certiID: 0,
                priority: 0
            }
        }
    }
    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkill(positionFormIndex, this.state.hardSkillDetail)
    }

    showItems = (hardSkill, positionFormIndex) => {
        var result = null;
        result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
            return (
                <HardSkillFormContent key={hardSkillIndex}
                    hardSkillDetail={hardSkillDetail}
                    hardSkillIndex={hardSkillIndex}
                    positionFormIndex={positionFormIndex}
                    onDeleteHardSkill={this.props.onDeleteHardSkill}
                    updateHardSkillExpPriority={this.props.updateHardSkillExpPriority}
                    onUpdateHardSkillID={this.props.onUpdateHardSkillID} 
                    onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                />
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